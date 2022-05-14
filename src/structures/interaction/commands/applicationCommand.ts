import { Interaction } from "../interaction.ts";
import {
  APICommandAutocompleteInteractionResponseCallbackData,
  APIInteraction,
  InteractionResponseType,
} from "../../../types/mod.ts";
import { camelize } from "../../../../deps.ts";
import { discordFetch as request } from "../../../rest/request.ts";
import { Messages } from "../../../errors/messages.ts";
import { Modal } from "../../components/modal.ts";
export class ApplicationCommandInteraction extends Interaction {
  id = "";
  applicationId: APIInteraction["application_id"] = "";
  type = 2;
  data?: APIInteraction["data"] = {} as APIInteraction["data"];
  guildId?: APIInteraction["guild_id"] = "";
  channelId?: APIInteraction["channel_id"] = "";
  member?: APIInteraction["member"];
  user?: APIInteraction["user"];
  version = 1;
  message?: APIInteraction["message"];
  locale?: string;
  guildLocale?: string;
  constructor(
    protected interaction: APIInteraction & { locale: string },
    protected token: string,
  ) {
    super(interaction, token);
    for (const key in this.interaction) {
      // @ts-ignore
      this[camelize(key)] = this.interaction[key];
    }
  }
  async populateAutoCompleteChoices(
    choices: { name: string; value: string }[],
  ) {
    if (choices.length > 25) {
      throw new Error(
        Messages.TOO_MANY_AUTOCOMPLETE_OPTIONS(choices.length),
      );
    }
    if (!this.isAutoComplete) {
      throw new Error("This is not an autocomplete interaction");
    }
    if (this.replied) {
      throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    }
    await request(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
      this.token,
      {
        type: InteractionResponseType
          .ApplicationCommandAutocompleteResult,
        data: { choices },
      },
    );
    this.replied = true;
  }
  async showModal(modal: Modal) {
    if (this.replied) {
      throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    }
    if (this.isModalSubmit) {
      throw new Error("This is not a modal interaction");
    }
    await request(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
      this.token,
      {
        type: InteractionResponseType.Modal,
        data: { ...modal.toJSON() },
      },
    );
    this.replied = true;
  }
  async closeModal() {
    if (!this.isModalSubmit) {
      throw new Error("This is not a modal interaction");
    }
    await request(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
      this.token,
      {
        type: InteractionResponseType.DeferredMessageUpdate,
      },
    );
  }
}
