import { Base } from "../../client/base.ts";
import {
  ButtonInteraction,
  ModalComponentInteraction,
  SelectMenuInteraction,
} from "./classes/mod.ts";
import {
  APIMessageComponentButtonInteraction,
  APIMessageComponentSelectMenuInteraction,
  APIModalSubmitInteraction,
  ComponentType,
  EventEmitter,
  InteractionType,
} from "../../../deps.ts";

type CollectorEvents = {
  buttonInteraction: (interaction: ButtonInteraction) => unknown;
  selectMenuInteraction: (interaction: SelectMenuInteraction) => unknown;
  modalInteraction: (interaction: ModalComponentInteraction) => unknown;
};

export class ComponentCollector extends EventEmitter<CollectorEvents> {
  constructor(client: Base, channelId: string) {
    super();
    client.on(
      "InteractionCreate",
      (
        e:
          | APIMessageComponentButtonInteraction
          | APIMessageComponentSelectMenuInteraction
          | APIModalSubmitInteraction,
      ) => {
        const { channel_id, type } = e;

        if (
          type === InteractionType.MessageComponent && channel_id === channelId,
            (e as unknown as APIMessageComponentButtonInteraction).data
              .component_type! === ComponentType.Button
        ) {
          const interaction = new ButtonInteraction(
            client,
            channelId,
            e as APIMessageComponentButtonInteraction,
          );
          this.emit("buttonInteraction", interaction);
        } else if (
          type === InteractionType.MessageComponent && channel_id === channelId,
            (e as unknown as APIMessageComponentSelectMenuInteraction).data
              .component_type! === ComponentType.SelectMenu
        ) {
          const interaction = new SelectMenuInteraction(
            client,
            channelId,
            e as APIMessageComponentSelectMenuInteraction,
          );
          this.emit("selectMenuInteraction", interaction);
        } else if (
          type === InteractionType.ModalSubmit && channel_id === channelId
        ) {
          const interaction = new ModalComponentInteraction(e, client);
          this.emit("modalInteraction", interaction);
        }
      },
    );
  }
}
