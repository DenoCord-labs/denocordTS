import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";

export function sendPingPayload(
  websocket: WebSocketClient,
  heartbeat_interval: number
) {
  const payload = JSON.stringify({
    op: 1,
    d: null,
  });
  setInterval(() => {
    websocket.send(payload);
  }, heartbeat_interval);
}
