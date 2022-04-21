import { discordFetch } from "../../helpers/request.ts";
import {
  APIInteraction,
  APIInteractionResponseCallbackData,
  InteractionResponseType,
  MessageFlags
} from "../../types/mod.ts";

export class Interaction {
  protected deferred = false;
  protected replied = false;
  constructor(
    protected interaction: APIInteraction & { locale: string },
    protected token: string
  ) {}
  protected create() {
    const obj = {
      application_id: this.interaction.application_id,
      data: this.interaction.data,
      guild_id: this.interaction.guild_id,
      channel_id: this.interaction.channel_id,
      member: this.interaction.member,
      user: this.interaction.user,
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
      guild_locale: this.interaction.guild_locale
    };
    return obj as APIInteractionResponseCallbackData;
  }
  async reply(
    data: Omit<
      APIInteractionResponseCallbackData & {
        ephemeral?: boolean;
        suppress_embeds?: boolean;
      },
      "flags"
    >
  ) {
    const { suppress_embeds, ephemeral, ...payloadData } = data;
    this.replied = true;
    let flags = 0;
    if (ephemeral) flags |= MessageFlags.Ephemeral;
    if (suppress_embeds) flags |= MessageFlags.SuppressEmbeds;

    const payload = { ...payloadData, flags };
    await discordFetch(``, "POST", this.token, {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: payload
    });
  }
  async deferReply(payload = { ephemeral: false }) {
    this.deferred = true;
    const { ephemeral } = payload;
    await discordFetch(
      `/interactions/${this.interaction.id}/${this.interaction.token}/defer`,
      "POST",
      this.token,
      {
        type: InteractionResponseType.DeferredChannelMessageWithSource,
        ephemeral
      }
    );
  }
  async editReply(payload: APIInteractionResponseCallbackData) {
    await discordFetch(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/@original`,
      "PATCH",
      this.token,
      payload
    );
  }

  async deleteReply() {
    await discordFetch(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/@original`,
      "DELETE",
      this.token
    );
  }

  async followUp(payload: APIInteractionResponseCallbackData) {
    const res = await discordFetch(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/${this.interaction.message?.id}`,
      "GET",
      this.token,
      payload
    );
    return await res.json();
  }

  async fetchFollowUp() {
    const res = await discordFetch(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/${this.interaction.message?.id}`,
      "GET",
      this.token
    );
    return await res.json();
  }

  async editFollowUp(payload: APIInteractionResponseCallbackData) {
    await discordFetch(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/${this.interaction.message?.id}`,
      "PATCH",
      this.token,
      payload
    );
  }

  async deleteFollowUp() {
    await discordFetch(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/${this.interaction.message?.id}`,
      "DELETE",
      this.token
    );
  }

  async fetchResponse() {
    await discordFetch(
      `/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/@original`,
      "GET",
      this.token
    );
  }

  async deferUpdate() {
    await discordFetch(
      `/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
      "POST",
      this.token,
      { type: InteractionResponseType.DeferredMessageUpdate }
    );
  }

  generate() {
    const payload = this.create();
    const obj = {
      ...payload
    };
    return obj;
  }
}
