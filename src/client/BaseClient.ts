import { ws } from "../websocket.ts";
import EventEmitter from "https://deno.land/x/eventemitter@1.2.1/mod.ts";
import { GatewayEvents } from "../types/index.ts";
import { GatewayIntents } from "../types/shared.ts";
import { sendIndentificationPayload } from "../websockets/payloads/identify.ts";
import { Message } from "../structures/Message.ts";
import { ClientUser } from "../types/Client.ts";
import { BASE_AVATAR_URL } from "../constants/index.ts";
import { Guild } from "../types/Guild.ts";
import { Cache } from "../cache/index.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";
import { OPCodes } from "../types/Gateway.ts";
import { DeletableMessage } from "../types/Message.ts";
import {GatewayDispatchEvents,GatewayOpcodes} from '../types/mod.ts'

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
  protected websocket = ws;
  /**
   * The Heartbeat Interval for the Client
   * @default 41250
   */
  protected heartbeatInterval = 41250;
  protected start: number = Date.now();

  /**
   * Cache for the Client
   */
  protected cache = new Cache();
  /**
   * Client's Uptime in Milliseconds
   */
  protected uptime = new Date().getTime();

  protected guilds: Guild[] = [];
  ping = -1;

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
      const { op, d, t }:{op:GatewayOpcodes,d:any,t:GatewayDispatchEvents} = JSON.parse(e.data);
      
      switch (OPCodes[op]) {
        case "HELLO":
          this.heartbeatInterval = d.heartbeat_interval;
          this.ping = Date.now() - this.start;
          sendIndentificationPayload(this.websocket, token, intents);
          break;
        case "HEARTBEAT_ACK":
          this.ping = Date.now() - this.start;
          break;
      }
      switch (t) {
        case "MESSAGE_CREATE": {
          if (d.author.id === this.clientId) return;
          const message = new Message(d, this.token, this);
          const messagePayload: DeletableMessage = {
            ...message.msg,
            reply: message.reply.bind(message),
            delete: message.delete.bind(message),
          } as unknown as DeletableMessage;

          this.events.emit("messageCreate", messagePayload);
          break;
        }
        case "READY": {
          this.user = {
            ...d.user,
            guilds: d.guilds.map(
              (g: { id: string; unavailable: boolean }) => g.id
            ),
          };
          break;
        }
        case "GUILD_CREATE": {
          this.guilds.push({ ...d });
          this.cache.set("guilds", this.guilds);
          this.guilds.forEach((g) => {
            g.members!.forEach((m) => {
              this.cache.set(`${m.user.id}`, m);
            });
          });
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
        case "INTERACTION_CREATE": {
          if (d.type == 3) {
            this.events.emit("componentInteraction", d);
          }
        }
        
      }
    });

    this.websocket.on("error", (e) => {
      console.error("error", e);
      this.events.emit("error", e);
    });

    this.sendPingPayload(this.websocket);
  }

  sendPingPayload(websocket: WebSocketClient) {
    const payload = JSON.stringify({
      op: OPCodes.HEARTBEAT,
      d: null,
    });
    setInterval(() => {
      this.start = Date.now();
      websocket.send(payload);
    }, this.heartbeatInterval);
  }
  avatarURL(): string {
    return `${BASE_AVATAR_URL}/${this.user.id}/${this.user.avatar}.png`;
  }
}
