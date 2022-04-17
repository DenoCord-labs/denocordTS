import { WebSocketClient } from "../../../deps.ts";
import { OPCodes } from "../../types/Gateway.ts";
import { GatewayIntents } from "../../types/shared.ts";
export function sendIndentificationPayload(
  websocket: WebSocketClient,
  token: string,
  intents: (keyof typeof GatewayIntents)[]
) {
  const payload = JSON.stringify({
    op: OPCodes.IDENTIFY,
    d: {
      token,
      intents: intents.reduce(
        (bits, next) => (bits |= GatewayIntents[next]),
        0
      ),
      properties: {
        $os: Deno.build.os,
        $browser: "denocord",
        $device: "denocord",
      },
    },
  });
  websocket.send(payload);
}
