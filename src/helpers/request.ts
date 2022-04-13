import { BASE_API_URL } from "../constants/index.ts";

export class ApiRequest {
  constructor(
    private url: string,
    private method: string,
    // deno-lint-ignore no-explicit-any
    private body?: any,
    private token?: string
  ) {}
  async send() {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (this.token) headers.set("Authorization", `Bot ${this.token}`);
    const url = this.url.includes("http") ? this.url : BASE_API_URL + this.url;
    const res = await fetch(`${url}`, {
      method: this.method,
      headers,
      body: this.method === "GET" ? undefined : JSON.stringify(this.body),
    });
    if (!res.ok)
      throw new Error(
        JSON.stringify({ statusCode: res.status, ...(await res.json()) })
      );

    return res;
  }
}
