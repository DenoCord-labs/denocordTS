import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";


export function sendPingPayload(websocket: WebSocketClient) {
  const payload = JSON.stringify({
    op: 1,
    d: null,
  });
  websocket.send(payload);
}
