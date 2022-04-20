import { Base } from "./base.ts";
import { ClientOptions } from "../types/mod.ts";
import { GatewayPresenceUpdateData, GatewayOpcodes } from "../../deps.ts";
export class Client extends Base {
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
