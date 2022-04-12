import EventEmitter from "https://deno.land/x/eventemitter@1.2.1/mod.ts";

import { CollectorEvents } from "../types/Collector.ts";
import { Client } from "../client/index.ts";
import { ButtonInteraction, Payload } from "../classes/ButtonInteraction.ts";
import { SelectMenuInteraction } from "../classes/SelectMenuInteraction.ts";
import { BaseClient } from "../client/BaseClient.ts";
import { Interaction } from "../classes/Interaction.ts";
import { ComponentType } from "../types/Component.ts";
export class InteractionCollector extends EventEmitter<
  CollectorEvents<Payload>
> {
  constructor(public readonly client: BaseClient, private messageId: string) {
    super();
    this.listen();
  }
  listen() {
    this.client.events.on("componentInteraction", async (e) => {
      if (e.message?.id == this.messageId) {
        switch (ComponentType[e.type]) {
          case "BUTTON": {
            const interaction = new ButtonInteraction(e);
            await this.emit("button", interaction.generate());

            break;
          }
          case "SELECT_MENU": {
            const interaction = new SelectMenuInteraction(e);
            await this.emit("selectMenu", interaction.generate());
            break;
          }
        }
      }
    });
  }
}
