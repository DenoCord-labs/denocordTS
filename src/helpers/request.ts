import { BASE_API_URL } from "../constants/index.ts";

export class ApiRequest {
  constructor(
    private url: string,
    private method: string,
    private body: any,
    private token: string
  ) {
    console.log(JSON.stringify(body));
  }
  async send() {
    const res = await fetch(`${BASE_API_URL}/${this.url}`, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${this.token}`
      },
      body: JSON.stringify(this.body)
    });

    if (!res.ok)
      throw new Error(
        JSON.stringify({ statusCode: res.status, ...(await res.json()) })
      );

    return res;
  }
}
