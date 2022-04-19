import { StandardWebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";
import { BASE_WS_URL } from "./constants/index.ts";

export class WebSocketClient extends StandardWebSocketClient {
  private open = false;
  constructor(url: string) {
    super(url);
    (this.webSocket as WebSocket).onopen = () => {
      this.emit("open");
      this.open = true;
    };
    (this.webSocket as WebSocket).onclose = (e) => {
      this.emit("close", e);
    };
  }

  private waitToOpen() {
    return new Promise<void>((resolve, reject) => {
      this.on("open", () => resolve());
    });
  }

  async send(message: string | Uint8Array) {
    if (!this.open) await this.waitToOpen();
    await super.send(message);
  }
}

export const ws = new WebSocketClient(BASE_WS_URL);
