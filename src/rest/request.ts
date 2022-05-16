import { BaseRestApiUrl } from "../constants/mod.ts";
import { HttpError } from "../handler/errors/http.ts";
export async function request(
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
		new HttpError(await res.json());
	}
	return res;
}
