import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";
import { Presence } from "../../types/presence.ts";
import { ActivityType } from "../../types/presence.ts";
export async function setPresence(ws: WebSocketClient, presence: Presence) {
  await ws.send(
    JSON.stringify({
      op: 3,
      d: {
        since: new Date().getTime(),
        activities: [
          {
            name: presence.activity.name,
            type: ActivityType[presence.activity.type],
          },
        ],
        status: presence.status,
        afk: presence.afk,
      },
    })
  );
}
