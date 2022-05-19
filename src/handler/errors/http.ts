// Used to handle the Http Error Events
import { DiscordApiError } from "../../errors/mod.ts";

export class HttpError {
	constructor(error: Record<string, string>) {
		throw new DiscordApiError(
			`[Http Error] StatusCode:${error.statusCode} ApiCode:${error.code} Message:${error.message}`
		);
	}
}
