import { Interaction } from "../interaction.ts";
import {
  APIApplicationCommandInteraction,
  APIAttachment,
  APIChannel,
  APIInteraction,
  APIRole,
  ApplicationCommandType,
  InteractionResponseType,
} from "../../../types/mod.ts";
import { Messages } from "../../../errors/messages.ts";
import { Modal } from "../../components/modal.ts";
import { Base } from "../../../client/base.ts";
import { GuildMember, User } from "../../mod.ts";
export class ApplicationCommandInteraction extends Interaction {
  channel;
  commandName;
  data;
  user;
  member;
  guildLocale;
  locale;
  channelId;
  type;
  constructor(
    protected interaction: APIApplicationCommandInteraction,
    protected token: string,
    protected client: Base,
  ) {
    super(interaction, token, client);
    this.channelId = interaction.channel_id;
    this.channel = this.client.cache.channels.get(
      interaction.channel_id,
    );
    this.type = interaction.type;
    this.commandName = interaction.data.name;
    this.data = interaction.data;
    this.guildLocale = interaction.guild_locale;
    this.user = "guild_id" in interaction
      ? undefined
      : new User(interaction.user, this.client);
    this.user = interaction.member
      ? new User(interaction.member.user, this.client)
      : undefined;
    this.member = "guild_id" in interaction
      ? new GuildMember(
        interaction,
        this.client,
        this.client.cache.guilds.get(interaction.guild_id || "")
          ?.ownerId === interaction.member!.user.id,
      )
      : undefined;
    this.locale = interaction.locale;
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
    if (this.replied) throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    await this.rest.request(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
      {
        type: InteractionResponseType
          .ApplicationCommandAutocompleteResult,
        data: { choices },
      },
    );
  }
  async showModal(modal: Modal) {
    if (this.replied) {
      throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    }
    if (this.isModalSubmit) {
      throw new Error("This is not a modal interaction");
    }
    await this.rest.request(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
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
    await this.rest.request(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
      {
        type: InteractionResponseType.DeferredMessageUpdate,
      },
    );
  }
  getStringFromOption(option: string) {
    let value: undefined | string;
    if (!this.data) return;
    (this.data as any).options.map((o: Record<string, string | number>) => {
      if (o.name === option && o.type === 3) value = o.value as string;
    });
    return value;
  }
  getIntegerFromOption(option: string) {
    let value: undefined | number;
    if (!this.data) return;
    (this.data as any).options.map((o: Record<string, string | number>) => {
      if (o.name === option && o.type === 4) value = o.value as number;
    });
    return value;
  }
  getBooleanFromOption(option: string) {
    let value: undefined | boolean;
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 5) {
          value = o.value as boolean;
        }
      },
    );
    return value;
  }
  getUserFromOption(option: string) {
    let value: undefined | APIInteraction["user"];
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 6) {
          value = o.value as unknown as APIInteraction["user"];
        }
      },
    );
    return value;
  }
  getChannelFromOption(option: string) {
    let value: undefined | APIChannel;
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 7) {
          value = o.value as unknown as APIChannel;
        }
      },
    );
    return value;
  }
  getRoleFromOption(option: string) {
    let value: undefined | APIRole;
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 8) {
          value = o.value as unknown as APIRole;
        }
      },
    );
    return value;
  }
  getMentionableFromOption(option: string) {
    let value: undefined | APIRole | APIInteraction["user"];
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 9) {
          value = o.value as unknown as
            | APIRole
            | APIInteraction["user"];
        }
      },
    );
    return value;
  }
  getNumberFromOption(option: string) {
    let value: undefined | number;
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 10) {
          value = o.value as number;
        }
      },
    );
    return value;
  }
  getAttachmentFromOption(option: string) {
    let value: undefined | APIAttachment;
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 11) {
          value = o.value as unknown as APIAttachment;
        }
      },
    );
    return value;
  }
}
