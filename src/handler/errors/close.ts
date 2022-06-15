// Used to handle the websocket's close event
export function handleCloseEventMessage(errorCode: number): string {
  switch (errorCode) {
    case 4000: {
      throw new Error("Unknown Error: Unknown Error");
    }
    case 4001: {
      throw new Error("Unknown opcode: An Invalid Gateway OP code was sent");
    }
    case 4002: {
      throw new Error("Decode error: An invalid payload was sent");
    }
    case 4003: {
      throw new Error(
        "Not authenticated: Gateway Payload was sent before Identification Payload",
      );
    }
    case 4004: {
      throw new Error("Authentication failed: Invalid token was started");
    }
    case 4005: {
      throw new Error(
        "Already authenticated: Identification Payload was sent more than once",
      );
    }
    case 4007: {
      throw new Error(
        "Invalid sequence: A Gateway Payload was sent out of sequence",
      );
    }
    case 4008: {
      throw new Error(
        "Rate limited: The client has sent too many requests in a short amount of time",
      );
    }
    case 4009: {
      throw new Error(
        "Session timeout: The client has not sent a heartbeat in a while",
      );
    }
    case 4010: {
      throw new Error(
        "Invalid shard: The client is trying to use an invalid shard",
      );
    }
    case 4011: {
      throw new Error(
        "Sharding required: Session handled too many guilds, sharding required",
      );
    }
    case 4012: {
      throw new Error(
        "Invalid API version: The client is trying to use an invalid API version",
      );
    }
    case 4013: {
      throw new Error(
        "Invalid Intents: The client is trying to use an invalid Intents",
      );
    }
    case 4014: {
      throw new Error("Disallowed Intents: Enabled Priviledged Intents.");
    }
    default: {
      throw new Error("Unknown Error");
    }
  }
}
