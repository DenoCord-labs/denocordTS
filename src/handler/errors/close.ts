// Used to handle the websocket's close event

export class CloseEventHandler extends Error {
	constructor(errorCode: number) {
		switch (errorCode) {
			case 4000: {
				throw super("Unknown Error: Unknown Error");
			}
			case 4001: {
				throw super(
					"Unknown opcode: An Invalid Gateway OP code was sent"
				);
			}
			case 4002: {
				throw super("Decode error: An invalid payload was sent");
			}
			case 4003: {
				throw super(
					"Not authenticated: Gateway Payload was sent before Identification Payload"
				);
			}
			case 4004: {
				throw super("Authentication failed: Invalid token was started");
			}
			case 4005: {
				throw super(
					"Already authenticated: Identification Payload was sent more than once"
				);
			}
			case 4007: {
				throw super(
					"Invalid sequence: A Gateway Payload was sent out of sequence"
				);
			}
			case 4008: {
				throw super(
					"Rate limited: The client has sent too many requests in a short amount of time"
				);
			}
			case 4009: {
				throw super(
					"Session timeout: The client has not sent a heartbeat in a while"
				);
			}
			case 4010: {
				throw super(
					"Invalid shard: The client is trying to use an invalid shard"
				);
			}
			case 4011: {
				throw super(
					"Sharding required: Session handled too many guilds, sharding required"
				);
			}
			case 4012: {
				throw super(
					"Invalid API version: The client is trying to use an invalid API version"
				);
			}
			case 4013: {
				throw super(
					"Invalid Intents: The client is trying to use an invalid Intents"
				);
			}
			case 4014: {
				throw super("Disallowed Intents: Enabled Priviledged Intents.");
			}
		}
	}
}
