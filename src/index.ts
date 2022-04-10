import {
  WebSocketClient,
  StandardWebSocketClient,
} from "https://deno.land/x/websocket@v0.1.3/mod.ts";
import { BASE_WS_URL } from "./constants/index.ts";

export const ws: WebSocketClient = new StandardWebSocketClient(BASE_WS_URL);
