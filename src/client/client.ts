import { Base } from "./base.ts";
import { ClientOptions } from "../types/mod.ts";
import { GatewayOpcodes, GatewayPresenceUpdateData } from "../types/mod.ts";
import { CDN } from "../rest/cdn.ts";
export class Client extends Base {
  public cdn = new CDN();
  constructor(protected options: ClientOptions) {
    super(options);
  }
  setPresence(presence: GatewayPresenceUpdateData) {
    this.websocket.send(
      JSON.stringify({
        op: GatewayOpcodes.PresenceUpdate,
        d: {
          ...presence,
        },
      })
    );
  }
}
