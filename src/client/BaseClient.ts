import { ws } from "../index.ts";
import EventEmitter from "https://deno.land/x/eventemitter@1.2.1/mod.ts";
import { GatewayEvents } from "../types/index.ts";
import { GatewayIntents } from "../types/shared.ts";
import { sendIndentificationPayload } from "../websockets/payloads/index.ts";
import { sendPingPayload } from "../websockets/payloads/ping.ts";
import { Message } from "../structures/Message.ts";
import { ClientUser } from "../types/Client.ts";
import { BASE_AVATAR_URL } from "../constants/index.ts";

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
   * @type {number}
   * @memberof BaseClient
   * @example
   */
  protected heartbeatInterval = 41250;
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
      const data = JSON.parse(e.data);
      Deno.writeTextFileSync(`./logs/${data.t}.json`, e.data);
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
          };
          this.events.emit("message", messagePayload);
          break;
        }
        case "READY": {
          this.events.emit("ready");
          this.user = {
            ...d.user,
            guilds: d.guilds.map(
              (g: { id: string; unavailable: boolean }) => g.id
            ),
          };
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
