import { EventEmitter } from "../../../deps.ts";
import { CollectorEvents } from "../../types/collector.ts";
import { Client } from "../../client/client.ts";
import { ButtonInteraction } from "./classes/Button.ts";
import { SlashMenuInteraction as SelectMenuInteraction } from "./classes/SelectMenu.ts";
export class ComponentCollector extends EventEmitter<CollectorEvents> {
  constructor(private client: Client, private channelId: string) {
    super();
    this.client.on("InteractionCreate", (e) => {
      if (
        e.type == 3 &&
        e.channel_id == this.channelId &&
        e.data.component_type == 2
      ) {
        this.emit(
          "buttonInteraction",
          new ButtonInteraction(this.client, this.channelId, e)
        );
      } else if (
        e.type == 3 &&
        e.channel_id == this.channelId &&
        e.data.component_type == 3
      ) {
        this.emit(
          "selectMenuInteraction",
          new SelectMenuInteraction(this.client, this.channelId, e)
        );
      }
    });
  }
}
