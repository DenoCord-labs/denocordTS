import { BaseComponent } from "./base.ts";
import { Base } from "../../../client/base.ts";
import { APIMessageComponentSelectMenuInteraction } from "../../../types/mod.ts";
export class SelectMenuInteraction extends BaseComponent {
  values: string[] = [];
  constructor(
    public client: Base,
    public channelId: string,
    d: APIMessageComponentSelectMenuInteraction,
  ) {
    super(client, channelId, d);
    this.values = d.data.values;
  }
}
