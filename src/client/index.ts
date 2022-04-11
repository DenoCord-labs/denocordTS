import { ClientOptions } from "../types/ClientOptions.ts";
import { Presence } from "../types/presence.ts";
import { setPresence } from "../websockets/payloads/presence.ts";
import { BaseClient } from "./BaseClient.ts";
import { Guild } from "../types/Guild.ts";
export class Client extends BaseClient {
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
  getCachedGuilds() {
    if (this.cache.has("guilds")) {
      return this.cache.get("guilds") as Guild[];
    }
    return null;
  }
  getCachedGuild(id: string) {
    if (this.cache.has("guilds")) {
      const guilds = this.cache.get("guilds") as Guild[];
      return guilds.find((g) => g.id === id);
    }
    return null;
  }
}
