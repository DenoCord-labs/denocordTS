// deno-lint-ignore-file no-explicit-any

import { ApiRequest } from "../helpers/request.ts";
import { ReplyPayload } from "../types/ReplyPayload.ts";
import { Payload } from "./ButtonInteraction.ts";
export class Interaction {
  deferred = false;
  protected message_id: any;
  constructor(protected d: any) {}
  protected create() {
    const obj: Payload & {
      data: { custom_id: string; values: string[]; component_type: number }[];
    } = {
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
    };
    this.message_id = this.d.message.id;

    return obj;
  }
  public async deferReply({
    ephemeral,
  }: {
    ephemeral?: boolean;
  }): Promise<void> {
    this.deferred = true;
    await new ApiRequest(
      `/interactions/${this.d.id}/${this.d.token}/callback`,
      "POST",
      { type: 5, ephemeral: ephemeral ? true : false }
    ).send();
  }
  public async reply(payload: ReplyPayload) {
    if (this.deferred) {
      throw new Error("Interaction Already Acknowledged");
    }
    await new ApiRequest(
      `/interactions/${this.d.application_id}/${this.d.token}/callback`,
      "POST",
      payload
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
      { type: 6 }
    ).send();
  }
}
