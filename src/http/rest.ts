import { Collection } from "../../deps.ts";
import { BaseRestApiUrl } from "../constants/mod.ts";
import { HttpError } from "../handler/errors/http.ts";

export class RestClient extends Collection<
  string,
  Record<string, number | Record<string, string | null>>
> {
  constructor() {
    super();
  }
  async request(
    href: string,
    method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
    body: unknown = {},
    headers?: HeadersInit,
    strignifyBody?: boolean,
    formData: boolean = false,
  ) {
    const url = href.includes("http") ? href : `${BaseRestApiUrl}${href}`;
    const needsQueue = this.checks(url);
    if (!(window as typeof window & { token: string }).token) {
      throw new Error("Token Not Provided to an api request!");
    }
    if (needsQueue.queue === true) {
      return (await this.createQueue({
        href,
        method,
        body,
        strignifyBody,
        headers,
        time: needsQueue.time || 5,
        formData,
      })) as Response;
    }
    const res = await fetch(`${url}`, {
      headers: {
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        ...headers,
        Authorization: `Bot ${
          (window as typeof window & { token: string }).token
        }`,
        "User-Agent":
          "DiscordBot (https://github.com/denocord-labs/denocordts)",
      },
      method,
      body: method == "GET"
        ? undefined
        : ((!strignifyBody ? JSON.stringify(body) : body) as BodyInit),
    });
    if (!res.ok) {
      throw new HttpError(await res.json());
    }
    this.addUrlToCollection(url, res.headers);
    return res;
  }
  /**
   * Add url to collection with its ratelimit data
   */
  private addUrlToCollection(url: string, headers: Headers) {
    this.set(url, {
      timestamp: Date.now(),
      ratelimit: {
        bucket: headers.get("x-ratelimit-bucket"),
        limit: headers.get("x-ratelimit-limit"),
        remaining: headers.get("x-ratelimit-remaining"),
        reset: headers.get("x-ratelimit-reset"),
        resetAfter: headers.get("x-ratelimit-reset-after"),
      },
    });
  }
  private checks(url: string) {
    const data = this.get(url);
    if (data === undefined) {
      return {
        queue: false,
      };
    }
    if (
      parseInt((data.ratelimit as Record<string, string>).remaining) > 3
    ) {
      return { queue: false };
    }
    if (
      Date.now() / 1000 >
        parseFloat(
          (data.ratelimit as Record<string, string | null>).reset ||
            String((data.timestamp as number) + 5),
        )
    ) {
      return {
        queue: false,
      };
    }
    if (
      (Date.now() - (data.timestamp as number)) / 1000 >
        parseInt(
          (data.ratelimit as Record<string, string | null>)
            .resetAfter!,
        )
    ) {
      return {
        queue: false,
      };
    }
    return {
      queue: true,
      time: parseInt(
        (data.ratelimit as Record<string, string | null>)
          .resetAfter || "5",
      ) || 3,
    };
  }
  private async createQueue({
    time = 5,
    body = {},
    href,
    method,
    headers,
    strignifyBody,
    formData = false,
  }: {
    time?: number;
    href: string;
    method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
    body: any;
    headers?: HeadersInit;
    strignifyBody?: boolean;
    formData: boolean;
  }) {
    return await new Promise((resolve) => {
      setTimeout(async () => {
        const res = await this.request(
          href,
          method,
          body,
          headers,
          strignifyBody,
        );
        resolve(res);
      }, time * 1000);
    });
  }
}

export const RestClientInstance = new RestClient();
