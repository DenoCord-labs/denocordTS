import { Interaction } from "../interaction.ts";
import {
  APIApplicationCommandInteraction,
  APIModalSubmitInteraction,
  InteractionResponseType,
} from "../../../types/mod.ts";
import { Messages } from "../../../errors/messages.ts";
import { Modal } from "../../components/modal.ts";
import { Base } from "../../../client/base.ts";
import {
  DmChannel,
  GuildCategory,
  GuildMember,
  GuildNewsChannel,
  Role,
  TextChannel,
  ThreadChannel,
  User,
} from "../../mod.ts";
export class ApplicationCommandInteraction extends Interaction {
  channel;
  commandName;
  data;
  member;
  guildLocale;
  locale;
  channelId;
  type;
  userId
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
    if ("member" in interaction) {
      if ("user" in interaction.member!) {
        this.userId = interaction.member?.user.id
      }
    }
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
    await this.client.rest.request(
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
    if (this.replied || this.deferred) {
      throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    }
    if (this.isModalSubmit) {
      throw new Error("This is not a modal interaction");
    }
    await this.client.rest.request(
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
    await this.client.rest.request(
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
    let value: undefined | User;
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 6) {
          value = this.client.cache.users.get(o.value as string);
        }
      },
    );
    return value;
  }
  getChannelFromOption(option: string) {
    let value:
      | undefined
      | DmChannel
      | TextChannel
      | ThreadChannel
      | GuildNewsChannel
      | GuildCategory;
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 7) {
          value = this.client.cache.channels.get(o.value as string);
        }
      },
    );
    return value;
  }
  getRoleFromOption(option: string) {
    let value: undefined | Role;
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 8) {
          value = this.client.cache.roles.get(o.value as string);
        }
      },
    );
    return value;
  }
  getMentionableFromOption(option: string) {
    let value: undefined | User | Role;
    if (!this.data) return;
    (this.data as any).options.map(
      (o: Record<string, string | number | boolean>) => {
        if (o.name === option && o.type === 9) {
          value = this.client.cache.roles.get(o.value as string) ||
            this.client.cache.users.get(o.value as string);
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
  getModalValues() {
    const value: { type: number; customId: string; value: string }[] = [];
    const interaction = this as unknown as APIModalSubmitInteraction;
    if (interaction.data.components) {
      for (const component of interaction.data.components) {
        for (const comp of component.components) {
          value.push({
            customId: comp.custom_id,
            type: comp.type,
            value: comp.value,
          });
        }
      }
    }
    return value;
  }
}
