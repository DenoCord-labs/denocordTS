import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";
import { OPCodes } from "../../types/Gateway.ts";

export function sendPingPayload(
  websocket: WebSocketClient,
  heartbeat_interval: number
) {
  const payload = JSON.stringify({
    op: OPCodes.HEARTBEAT,
    d: null
  });
  setInterval(() => {
    const start = Date.now();
    websocket.send(payload);
    websocket.on("message", async (d) => {
      console.log(`Pong! Ping: ${Date.now() - start}ms`);
    });
  }, heartbeat_interval);
}
