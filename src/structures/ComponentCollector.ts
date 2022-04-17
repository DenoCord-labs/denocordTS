import { EventEmitter } from "../../deps.ts";
import { ComponentType } from "../types/mod.ts";
import { CollectorEvents } from "../types/Collector.ts";
import {
  Payload,
  ButtonInteraction,
  SelectMenuInteraction as SelectMenuInteractionType,
} from "../classes/ButtonInteraction.ts";
import { SelectMenuInteraction } from "../classes/SelectMenuInteraction.ts";
import { BaseClient } from "../client/BaseClient.ts";
export class InteractionCollector extends EventEmitter<
  CollectorEvents<Payload, SelectMenuInteractionType>
> {
  constructor(public readonly client: BaseClient, private messageId: string) {
    super();
    this.listen();
  }
  listen() {
    this.client.events.on("componentInteraction", async (e) => {
      if (e.message?.id == this.messageId) {
        switch (ComponentType[e.data?.component_type as number]) {
          case "BUTTON": {
            const interaction = new ButtonInteraction(e);
            await this.emit(
              "buttonInteraction",
              interaction.generate() as unknown as Payload
            );

            break;
          }
          case "SELECT_MENU": {
            const interaction = new SelectMenuInteraction(e);
            const data = interaction.generate() as SelectMenuInteractionType;
            await this.emit("selectMenuInteraction", data);
            break;
          }
        }
      }
    });
  }
}
