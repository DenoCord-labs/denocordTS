import {
  APIInteraction,
  APIInteractionResponseCallbackData,
  APIMessage,
  APIUserApplicationCommandInteractionDataResolved,
  InteractionResponseType,
  MessageFlags,
} from "../../types/mod.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
import { Messages } from "../../errors/messages.ts";
import { Camelize, camelize } from "../../../deps.ts";
import { ClientMessage, GuildMember, Message, User } from "../mod.ts";
import { Base } from "../../client/base.ts";
export class Interaction {
  protected deferred = false;
  protected replied = false;
  isComponentInteraction = false;
  isAutoComplete = false;
  isCommand = false;
  isModalSubmit = false;
  isUserContextMenu = false;
  isMessageContextMenu = false;
  targetedUsers: undefined | User[];
  targetMembers: undefined | Omit<GuildMember, "user" | "deaf" | "mute">[];
  targetMessage: undefined | (Message | ClientMessage)[];
  guild
  constructor(
    protected interaction: APIInteraction & { locale: string },
    protected token: string,
    protected client: Base,
  ) {
    switch (this.interaction.type) {
      case 2: {
        this.isCommand = true;
        break;
      }
      case 3: {
        this.isComponentInteraction = true;
        break;
      }
      case 4: {
        this.isAutoComplete = true;
        break;
      }
      case 5: {
        this.isModalSubmit = true;
        break;
      }
    }
    if (interaction.data && "type" in interaction.data) {
      if (interaction.data.type === 2) {
        this.isUserContextMenu = true;
      } else if (interaction.data.type === 3) {
        this.isMessageContextMenu = true;
      }
    }
    if (
      interaction.data &&
      "type" in interaction.data
    ) {
      if (interaction.data.type === 2) {
        this.targetedUsers = Object.keys(
          ((this.interaction.data as unknown as Record<string, string>)!
            .resolved as unknown as APIUserApplicationCommandInteractionDataResolved)!
            .users,
        ).map((user) => this.client.cache.users.get(user)!);
        if (
          (
            this.interaction
              .data! as unknown as Record<
                "resolved",
                Record<"members", unknown>
              >
          ).resolved.members
        ) {
          this.targetMembers = Object.keys(
            ((
              this.interaction
                .data! as unknown as Record<"resolved", unknown>
            ).resolved as unknown as APIUserApplicationCommandInteractionDataResolved)
              .members!,
          ).map((member) => this.client.cache.members.get(member)!);
        }
      } else if (interaction.data.type === 3) {
        this.targetMessage = Object.values(interaction.data.resolved.messages)
          .map((message) => {
            if (message.author.id === this.client.user.id) {
              return new ClientMessage(message, this.client);
            }
            return new Message(message, this.client);
          });
      }
    }
    this.guild = this.interaction.guild_id ? this.client.cache.guilds.get(this.interaction.guild_id) : undefined
  }
  protected create() {
    const isGuildOwner =
      this.client.cache.guilds.get(this.interaction.guild_id || "")?.ownerId ===
      this.interaction.user?.id;
    const obj = {
      application_id: this.interaction.application_id,
      data: this.interaction.data,
      guild_id: this.interaction.guild_id,
      channel_id: this.interaction.channel_id,

      member: this.interaction.member
        ? new GuildMember(this.interaction, this.client, isGuildOwner)
        : undefined,
      user: this.interaction.user
        ? new User(this.interaction.user, this.client)
        : undefined,
      message: this.interaction.message,
      deferReply: this.deferReply.bind(this),
      reply: this.reply.bind(this),
      editReply: this.editReply.bind(this),
      deleteReply: this.deleteReply.bind(this),
      followUp: this.followUp.bind(this),
      fetchFollowUp: this.fetchFollowUp.bind(this),
      editFollowUp: this.editFollowUp.bind(this),
      deleteFollowUp: this.deleteFollowUp.bind(this),
      id: this.interaction.id,
      token: this.interaction.token,
      locale: this.interaction.locale,
      type: this.interaction.type,
      version: this.interaction.version,
      guild_locale: this.interaction.guild_locale,
    };
    return obj as Camelize<APIInteractionResponseCallbackData>;
  }
  async reply(data: ReplyPayload) {
    if (this.replied) throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    if (this.deferred) {
      throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    }
    const { suppress_embeds, ephemeral, ...payloadData } = data;
    this.replied = true;
    let flags = 0;
    if (ephemeral) flags |= MessageFlags.Ephemeral;
    if (suppress_embeds) flags |= MessageFlags.SuppressEmbeds;

    const payload = { ...payloadData, flags };
    await this.client.rest.request(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
      {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          ...payload,
        },
      },
    );
  }
  async deferReply(payload = { ephemeral: false }) {
    if (this.deferred) {
      throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    }
    if (this.replied) throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    this.deferred = true;
    const { ephemeral } = payload;
    await this.client.rest.request(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
      {
        type: InteractionResponseType.DeferredChannelMessageWithSource,
        ephemeral,
      },
    );
  }
  async editReply(payload: ReplyPayload) {
    if (!this.replied && !this.deferred) {
      throw new Error(Messages.INTERACTION_NOT_REPLIED);
    }

    const r = await this.client.rest.request(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/@original`,
      "PATCH",
      {
        ...payload,
      },
    );
    return camelize(await r.json()) as Camelize<APIMessage>;
  }

  async deleteReply() {
    await this.client.rest.request(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/@original`,
      "DELETE",
    );
  }

  async followUp(payload: APIInteractionResponseCallbackData) {
    const res = await this.client.rest.request(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}`,
      "GET",
      { ...payload },
    );
    return await res.json();
  }

  async fetchFollowUp() {
    const res = await this.client.rest.request(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/${this
        .interaction.message?.id}`,
      "GET",
    );
    return await res.json();
  }

  async editFollowUp(payload: ReplyPayload) {
    await this.client.rest.request(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/${this
        .interaction.message?.id}`,
      "PATCH",
      {
        ...payload,
      },
    );
  }

  async deleteFollowUp() {
    await this.client.rest.request(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/${this
        .interaction.message?.id}`,
      "DELETE",
    );
  }

  async fetchResponse() {
    await this.client.rest.request(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/@original`,
      "GET",
    );
  }

  async deferUpdate() {
    await this.client.rest.request(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
      { type: InteractionResponseType.DeferredMessageUpdate },
    );
  }

  generate() {
    const payload = this.create();
    const obj = {
      ...payload,
    };
    return camelize(obj);
  }
}
