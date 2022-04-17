import { StandardWebSocketClient, WebSocketClient } from "../deps.ts";
import { BASE_WS_URL } from "./constants/index.ts";

export const ws: WebSocketClient = new StandardWebSocketClient(BASE_WS_URL);
