import { ws } from "../index.ts";
import EventEmitter from "https://deno.land/x/eventemitter@1.2.1/mod.ts";
import { GatewayEvents } from "../types/index.ts";
import { GatewayIntents } from "../types/shared.ts";
import { sendIndentificationPayload } from "../websockets/payloads/index.ts";
import { sendPingPayload } from "../websockets/payloads/ping.ts";
import { Message } from "../structures/Message.ts";
import { ClientUser } from "../types/Client.ts";
import { BASE_AVATAR_URL } from "../constants/index.ts";
import { Guild } from "../types/Guild.ts";

import { Cache } from "../cache/index.ts";
export class BaseClient {
  /**
   * User object of the Client
   */
  public user: ClientUser = {} as ClientUser;
  /**
   * The Event Emitter for the Client
   */
  events = new EventEmitter<GatewayEvents>();
  /**
   * The Websocket for the Client
   */
  websocket = ws;
  /**
   * The Heartbeat Interval for the Client
   * @default 41250
   */
  protected heartbeatInterval: number = 41250;

  /**
   * Cache for the Client
   */
  protected cache = new Cache();
  /**
   * Client's Uptime in Milliseconds
   */
  protected uptime = new Date().getTime();

  protected guilds: Guild[] = [];

  /**
   * Creates an instance of BaseClient.
   * @param {string} token The token for the Client
   * @param {(keyof typeof GatewayIntents)[]} intents The intents for the Client
   * @param {string} clientId The client ID of the Bot
   */
  constructor(
    protected token: string,
    intents: (keyof typeof GatewayIntents)[],
    public clientId: string
  ) {
    this.websocket.on("close", () => {
      console.log("Connection to Gateway closed");
      Deno.exit(0);
    });
    this.websocket.on("message", (e) => {
      const { op, d, t } = JSON.parse(e.data);

      switch (op) {
        case 10:
          this.heartbeatInterval = d.heartbeat_interval;
          sendIndentificationPayload(this.websocket, token, intents);

          break;
      }
      switch (t) {
        case "MESSAGE_CREATE": {
          if (d.author.id === this.clientId) return;
          const message = new Message(d, this.token);
          const messagePayload = {
            ...message.msg,
            reply: message.reply.bind(message),
            delete: message.delete.bind(message)
          };
          this.events.emit("message", messagePayload);
          break;
        }
        case "READY": {
          this.user = {
            ...d.user,
            guilds: d.guilds.map(
              (g: { id: string; unavailable: boolean }) => g.id
            )
          };
          break;
        }
        case "GUILD_CREATE": {
          this.guilds.push({ ...d });
          this.cache.set("guilds", this.guilds);
          if (
            this.cache.has("guilds") &&
            (this.cache.get("guilds") as Guild[]).length ==
              this.user.guilds.length
          ) {
            this.events.emit("ready");
          } else {
            this.events.emit("guildCreate", d);
          }
          break;
        }
      }
    });

    this.websocket.on("error", (e) => {
      console.log("error", e);
      this.events.emit("error", e);
    });

    sendPingPayload(this.websocket, this.heartbeatInterval);
  }
  avatarURL(): string {
    return `${BASE_AVATAR_URL}/${this.user.id}/${this.user.avatar}.png`;
  }
}
