import { Base } from "../../client/base.ts";
import { ButtonInteraction, SelectMenuInteraction } from "./classes/mod.ts";
import {
  APIMessageComponentButtonInteraction,
  APIMessageComponentSelectMenuInteraction,
  ComponentType,
  EventEmitter,
  InteractionType,
} from "../../../deps.ts";

type CollectorEvents = {
  buttonInteraction: (interaction: ButtonInteraction) => unknown;
  selectMenuInteraction: (interaction: SelectMenuInteraction) => unknown;
};

export class ComponentCollector extends EventEmitter<CollectorEvents> {
  constructor(client: Base, channelId: string) {
    super();
    client.on(
      "InteractionCreate",
      async (
        e:
          | APIMessageComponentButtonInteraction
          | APIMessageComponentSelectMenuInteraction,
      ) => {
        const { data: { component_type }, channel_id, type } = e;

        if (
          type === InteractionType.MessageComponent && channel_id === channelId,
            component_type === ComponentType.Button
        ) {
          const interaction = new ButtonInteraction(
            client,
            channelId,
            e as APIMessageComponentButtonInteraction,
          );
          this.emit("buttonInteraction", interaction);
        } else if (
          type === InteractionType.MessageComponent && channel_id === channelId,
            component_type === ComponentType.SelectMenu
        ) {
          const interaction = new SelectMenuInteraction(
            client,
            channelId,
            e as APIMessageComponentSelectMenuInteraction,
          );
          this.emit("selectMenuInteraction", interaction);
        }
      },
    );
  }
}
