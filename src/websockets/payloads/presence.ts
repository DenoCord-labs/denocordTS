import { WebSocketClient } from "../../../deps.ts";
import { OPCodes } from "../../types/Gateway.ts";
import { Presence } from "../../types/presence.ts";
import { ActivityType } from "../../types/presence.ts";
export async function setPresence(ws: WebSocketClient, presence: Presence) {
  await ws.send(
    JSON.stringify({
      op: OPCodes.PRESENCE_UPDATE,
      d: {
        since: new Date().getTime(),
        activities: [
          {
            name: presence.activity.name,
            type: ActivityType[presence.activity.type],
          },
        ],
        status: presence.status,
        afk: presence.afk || false,
      },
    })
  );
}
