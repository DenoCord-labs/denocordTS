import { BaseComponent } from "./base.ts";
import { Client } from "../../../client/client.ts";
import { APIMessageComponentButtonInteraction } from "../../../types/mod.ts";
export class ButtonInteraction extends BaseComponent {
  constructor(
    client: Client,
    channelId: string,
    d: APIMessageComponentButtonInteraction,
  ) {
    super(client, channelId, d);
  }
}
