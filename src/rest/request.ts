import { BaseRestApiUrl } from "../constants/mod.ts";

export async function discordFetch(
  href: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
  token: string,
  body: { [key: string]: unknown } = {},
  headers?: HeadersInit,
) {
  const url = href.includes("http") ? href : BaseRestApiUrl + href;
  const res = await fetch(`${url}`, {
    body: method === "GET" ? undefined : JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
      Authorization: `Bot ${token}`,
    },
    method,
  });
  if (!res.ok) {
    throw new Error(
      JSON.stringify({ statusCode: res.status, ...(await res.json()) }),
    );
  }
  return res;
}
