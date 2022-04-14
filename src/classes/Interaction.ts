// deno-lint-ignore-file no-explicit-any

import { ApiRequest } from "../helpers/request.ts";
import { InteractionCallbackType } from "../types/Interaction.ts";
import { MessageFlags } from "../types/Message.ts";
import { ReplyData, ReplyPayload } from "../types/ReplyPayload.ts";
export class Interaction {
  deferred = false;
  replied = false;
  protected message_id: any;
  constructor(protected d: { [key: string]: any }) {}
  protected create() {
    const obj = {
      application_id: this.d.application_id,
      data: this.d.data,
      guild_id: this.d.guild_id,
      channel_id: this.d.channel_id,
      member: this.d.member,
      user: this.d.user,
      message: this.d.message,
      deferReply: this.deferReply.bind(this),
      reply: this.reply.bind(this),
      editReply: this.editReply.bind(this),
      deleteReply: this.deleteReply.bind(this),
      followUp: this.followUp.bind(this),
      fetchFollowUp: this.fetchFollowUp.bind(this),
      editFollowUp: this.editFollowUp.bind(this),
      deleteFollowUp: this.deleteFollowUp.bind(this),
      id: this.d.id,
      token: this.d.token,
      locale: this.d.locale,
      type: this.d.type,
      version: this.d.version,
      guild_locale: this.d.guild_locale,
    };
    this.message_id = this.d.message.id;
    return obj;
  }
  public async deferReply(payload?: { ephemeral?: boolean }): Promise<void> {
    this.deferred = true;
    const { ephemeral } = payload || { ephemeral: false };
    await new ApiRequest(
      `/interactions/${this.d.id}/${this.d.token}/callback`,
      "POST",
      {
        type: InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        ephemeral,
      }
    ).send();
  }
  public async reply(data: ReplyData) {
    if (this.deferred || this.replied) {
      throw new Error("Interaction Already Acknowledged");
    }
    this.replied = true;
    const { suppress_embeds, ephemeral, ...payloadData } = data;
    let flags = 0;
    if (ephemeral) flags |= MessageFlags.EPHEMERAL;
    if (suppress_embeds) flags |= MessageFlags.SUPPRESS_EMBEDS;
    const payload: ReplyPayload = {
      ...payloadData,
      flags,
    };

    await new ApiRequest(
      `/interactions/${this.d.id}/${this.d.token}/callback`,
      "POST",
      {
        type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: payload,
      }
    ).send();
  }
  public async editReply(payload: ReplyPayload) {
    await new ApiRequest(
      `/webhooks/${this.d.application_id}/${this.d.token}/messages/@original`,
      "PATCH",
      payload
    ).send();
  }
  public async deleteReply() {
    await new ApiRequest(
      `/webhooks/${this.d.application_id}/${this.d.token}/messages/@original`,
      "DELETE",
      {}
    ).send();
  }
  public async followUp(payload: ReplyPayload) {
    await new ApiRequest(
      `/webhooks/${this.d.application_id}/${this.d.token}`,
      "POST",
      payload
    ).send();
  }
  public async fetchFollowUp() {
    const res = await new ApiRequest(
      `/webhooks/${this.d.application_id}/${this.d.token}/messages/${this.message_id}`,
      "GET",
      {}
    ).send();
    return await res.json();
  }

  public async editFollowUp(payload: ReplyPayload) {
    await new ApiRequest(
      `/webhooks/${this.d.application_id}/${this.d.token}/messages/${this.message_id}`,
      "PATCH",
      payload
    ).send();
  }
  public async deleteFollowUp() {
    await new ApiRequest(
      `/webhooks/${this.d.application_id}/${this.d.token}/messages/${this.message_id}`,
      "DELETE",
      {}
    ).send();
  }
  public async fetchResponse() {
    await new ApiRequest(
      `/webhooks/${this.d.application_id}/${this.d.token}/messages/@original`,
      "GET",
      {}
    ).send();
  }
  public async deferUpdate() {
    await new ApiRequest(
      `/interactions/${this.d.id}/${this.d.token}/callback`,
      "POST",
      { type: InteractionCallbackType.DEFERRED_UPDATE_MESSAGE }
    ).send();
  }
}
