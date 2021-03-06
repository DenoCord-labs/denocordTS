import { Collection } from "../../deps.ts";
import { BaseRestApiUrl } from "../constants/mod.ts";
import { DiscordAPIError } from "../errors/classes/DiscordApiError.ts";
import { ReplyPayload } from "../types/responsepayload.ts"
export class RestClient extends Collection<
  string,
  Record<string, number | Record<string, string | null>>
> {
  constructor(private readonly token: string) {
    super();
  }
  async request(
    href: string,
    method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
    body?: { [name: string]: unknown } | FormData | { [name: string]: unknown }[],
    headers?: { [name: string]: string } | HeadersInit,
    strignifyBody?: boolean,
    formData = false,
  ) {
    const url = href.includes("http") ? href : `${BaseRestApiUrl}${href}`;
    const needsQueue = this.checks(url);
    let bodyToSend = body
    const form = new FormData()
    if (formData) {
      const typedBody = body as ReplyPayload
      if (typedBody.attachments) {
        const attachments = typedBody.attachments.map((attachment, index) => ({ ...attachment, id: index }))
        attachments.map((attachment) => {
          form.append(`files[${attachment.id}]`, attachment.blob, attachment.name)
        })
        form.append("payload_json", JSON.stringify({ ...body, attachments }))
      }
      bodyToSend = form
    }
    const requiredHeaders: Record<string, string> = {}
    if (formData === false) {
      requiredHeaders['Content-Type'] = "application/json"
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
        ...requiredHeaders,
        ...headers,
        Authorization: `Bot ${this.token}`,
        "User-Agent":
          "DiscordBot (https://github.com/denocord-labs/denocordts)",
      },
      method,
      body: method == "GET"
        ? undefined
        : !(bodyToSend instanceof FormData) ? JSON.stringify(bodyToSend) : bodyToSend,
    });
    if (!res.ok) {
      const data = await res.json();
      throw new DiscordAPIError(data, data.code, res.status, method, url, body);
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
    body,
    href,
    method,
    headers,
    strignifyBody,
    formData = false,
  }: {
    time?: number;
    href: string;
    method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
    body?: { [key: string]: unknown } | FormData | { [name: string]: unknown }[];
    headers?: { [key: string]: string } | HeadersInit;
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
          formData,
        );
        resolve(res);
      }, time * 1000);
    });
  }
}
