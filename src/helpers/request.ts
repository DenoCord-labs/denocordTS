export class ApiRequest {
  constructor(
    private url: string,
    private method: string,
    private body: any,
    private token: string
  ) {}
  async send() {
    return await fetch(this.url, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${this.token}`,
      },
      body: JSON.stringify(this.body),
    });
  }
}
