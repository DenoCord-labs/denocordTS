// deno-lint-ignore-file no-explicit-any
import { BaseRestApiUrl } from "../constants/mod.ts";
export class ApiRequest {
  constructor(
    public url: string,
    public method: string,
    public body?: any,
    public token?: string,
    public headers?: Headers,
  ) {}
  async send() {
    const headers = new Headers();
    const url = this.url.includes("http")
      ? this.url
      : BaseRestApiUrl + this.url;
    headers.append("Content-Type", "application/json");
    if (this.headers) {
      for (const [key, value] of this.headers) headers.append(key, value);
    }
    if (this.token) {
      headers.append("Authorization", `Bot ${this.token}`);
    }
    const response = await fetch(url, {
      method: this.method,
      body: this.body ? JSON.stringify(this.body) : undefined,
      headers,
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    if (response.status === 403) {
      throw new Error("Forbidden");
    }
    if (response.status === 404) {
      throw new Error("Not Found");
    }
    if (response.status === 500) {
      throw new Error("Internal Server Error");
    }
    if (response.status === 502) {
      throw new Error("Bad Gateway");
    }
    if (response.status === 503) {
      throw new Error("Service Unavailable");
    }
    if (response.status === 504) {
      throw new Error("Gateway Timeout");
    }
    if (response.status === 505) {
      throw new Error("HTTP Version Not Supported");
    }
    return response;
  }
}
