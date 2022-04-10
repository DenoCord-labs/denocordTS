import { ws } from "../index.ts";
import EventEmitter from "https://deno.land/x/eventemitter@1.2.1/mod.ts";
import { GatewayEvents } from "../types/index.ts";
import { GatewayIntents } from "../types/shared.ts";
import { sendIndentificationPayload } from "../websockets/payloads/index.ts";
import { sendPingPayload } from "../websockets/payloads/ping.ts";
import { Presence } from "../types/presence.ts";
import { setPresence } from "../websockets/payloads/presence.ts";
export class Client {
  events = new EventEmitter<GatewayEvents>();
  websocket = ws;
  heartbeatInterval = 41250;
  constructor(token: string, intents: (keyof typeof GatewayIntents)[]) {
    this.websocket.on("close", () => {
      console.log("Connection to Gateway closed");
      Deno.exit(0);
    });
    this.websocket.on("message", (e) => {
      const data = JSON.parse(e.data);
      Deno.writeTextFileSync(`./logs/${data.t}.json`, e.data);
      const { op, d } = JSON.parse(e.data);
      switch (op) {
        case 10:
          this.heartbeatInterval = d.heartbeat_interval;
          sendIndentificationPayload(this.websocket, token, intents);
          this.events.emit("ready");

          break;
      }
    });

    this.websocket.on("error", (e) => {
      console.log("error", e);
      this.events.emit("error", e);
    });
    setInterval(() => {
      sendPingPayload(this.websocket);
    }, this.heartbeatInterval);
  }
  setPresence(presence: Presence) {
    setPresence(this.websocket, presence);
  }
}
