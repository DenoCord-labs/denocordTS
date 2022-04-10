import { GatewayIntents } from "../types/shared.ts";
import { Presence } from "../types/presence.ts";
import { setPresence } from "../websockets/payloads/presence.ts";
import { BaseClient } from "./BaseClient.ts";
export class Client extends BaseClient {
  protected uptime = new Date().getTime();
  /**
   *
   * Creates a Discord Client
   * @param {string} token The token for the Client
   * @param {(keyof typeof GatewayIntents)[]} intents The intents for the Client
   * @param {string} clientId The client ID of the Bot
   */

  constructor(
    token: string,
    intents: (keyof typeof GatewayIntents)[],
    clientId: string
  ) {
    super(token, intents, clientId);
  }
  setPresence(presence: Presence) {
    setPresence(this.websocket, presence);
  }
  /**
   *
   * @returns {number} The uptime of the Client in Milliseconds
   */
  getUptime(): number {
    return new Date().getTime() - this.uptime;
  }
}
