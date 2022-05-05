// Used to handle the websocket's close event
import { DiscordApiError } from "../../errors/mod.ts";

export class CloseEventHandler {
	constructor(errorCode: number) {
		switch (errorCode) {
			case 4000: {
				throw new DiscordApiError("Unknown Error: Unknown Error");
			}
			case 4001: {
				throw new DiscordApiError(
					"Unknown opcode: An Invalid Gateway OP code was sent",
				);
			}
			case 4002: {
				throw new DiscordApiError(
					"Decode error: An invalid payload was sent",
				);
			}
			case 4003: {
				throw new DiscordApiError(
					"Not authenticated: Gateway Payload was sent before Identification Payload",
				);
			}
			case 4004: {
				throw new DiscordApiError(
					"Authentication failed: Invalid token was started",
				);
			}
			case 4005: {
				throw new DiscordApiError(
					"Already authenticated: Identification Payload was sent more than once",
				);
			}
			case 4007: {
				throw new DiscordApiError(
					"Invalid sequence: A Gateway Payload was sent out of sequence",
				);
			}
			case 4008: {
				throw new DiscordApiError(
					"Rate limited: The client has sent too many requests in a short amount of time",
				);
			}
			case 4009: {
				throw new DiscordApiError(
					"Session timeout: The client has not sent a heartbeat in a while",
				);
			}
			case 4010: {
				throw new DiscordApiError(
					"Invalid shard: The client is trying to use an invalid shard",
				);
			}
			case 4011: {
				throw new DiscordApiError(
					"Sharding required: Session handled too many guilds, sharding required",
				);
			}
			case 4012: {
				throw new DiscordApiError(
					"Invalid API version: The client is trying to use an invalid API version",
				);
			}
			case 4013: {
				throw new DiscordApiError(
					"Invalid Intents: The client is trying to use an invalid Intents",
				);
			}
			case 4014: {
				throw new DiscordApiError(
					"Disallowed Intents: Enabled Priviledged Intents.",
				);
			}
		}
	}
}
