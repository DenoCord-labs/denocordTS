import { BaseComponent } from "./base.ts";
import { Client } from "../../../client/client.ts";
import { APIMessageComponentSelectMenuInteraction } from "../../../types/mod.ts";
export class SlashMenuInteraction extends BaseComponent {
  values: string[] = [];
  constructor(
    public client: Client,
    public channelId: string,
    d: APIMessageComponentSelectMenuInteraction
  ) {
    super(client, channelId, d);
    this.values = d.data.values;
  }
}
