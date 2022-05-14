import { BaseRestApiUrl } from "../constants/mod.ts";

export async function discordFetch(
  href: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
  token: string,
  body: any = {},
  headers?: HeadersInit,
  strignifyBody?: boolean,
) {
  const url = href.includes("http") ? href : BaseRestApiUrl + href;
  const res = await fetch(`${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
      Authorization: `Bot ${token}`,
    },
    method,
    body: method == "GET"
      ? undefined
      : ((!strignifyBody ? JSON.stringify(body) : body) as any),
  });
  if (!res.ok) {
    throw new Error(
      JSON.stringify({ statusCode: res.status, ...(await res.json()) }),
    );
  }
  return res;
}
