import { ClientOptions } from "../types/ClientOptions.ts";
import { Presence } from "../types/presence.ts";
import { setPresence } from "../websockets/payloads/presence.ts";
import { BaseClient } from "./BaseClient.ts";
export class Client extends BaseClient {
  protected uptime = new Date().getTime();
  /**
   *
   * Creates a Discord Client
   * @param {ClientOptions} options The options to create the Client with
   */

  constructor(options: ClientOptions) {
    super(options.token, options.intents, options.clientId);
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
