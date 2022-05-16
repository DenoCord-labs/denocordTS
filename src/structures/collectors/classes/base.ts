import {
  APIMessageComponentButtonInteraction,
  InteractionResponseType,
} from "../../../types/mod.ts";
import { ReplyPayload } from "../../../types/responsepayload.ts";
import { request } from "../../../rest/mod.ts";
import { ClientMessage } from "../../messages/ClientMessage.ts";
import { Messages } from "../../../errors/messages.ts";
import { Base } from "../../../client/base.ts";
export class BaseComponent {
  protected deferred = false;
  protected replied = false;
  public readonly version = 1;
  public type = 3;
  public readonly token!: string;
  public readonly message!: APIMessageComponentButtonInteraction["message"];
  public readonly member?: APIMessageComponentButtonInteraction["member"];
  public readonly id!: APIMessageComponentButtonInteraction["id"];
  public readonly guildId?: APIMessageComponentButtonInteraction["guild_id"];
  public data!: {};
  public readonly clientId!:
    APIMessageComponentButtonInteraction["application_id"];
  constructor(
    protected client: Base,
    protected channelId: string,
    protected d: any,
  ) {
    this.token = d.token;
    this.message = this.d.message;
    this.member = this.d.member;
    this.id = this.d.id;
    this.guildId = this.d.guild_id;
    this.data = this.d.data;
    this.clientId = this.d.application_id;
  }
  public async deferReply(ephemeral?: boolean) {
    this.deferred = true;
    const data = ephemeral
      ? {
        flags: 1 << 6,
      }
      : {};
    await request(
      `/interactions/${this.d!.id}/${this.d!.token}/callback`,
      "POST",
      this.client.token,
      {
        type: InteractionResponseType.DeferredChannelMessageWithSource,
        data,
      },
    );
  }
  public async reply(payload: ReplyPayload) {
    if (this.deferred) {
      throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
    }
    await request(
      `/interactions/${this.d!.id}/${this.d!.token}/callback`,
      "POST",
      this.client.token,
      {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: { ...payload },
      },
    );
    this.replied = true;
    return null;
  }
  public async editReply(payload: ReplyPayload) {
    if (!this.deferred && !this.replied) {
      throw new Error(Messages.INTERACTION_NOT_REPLIED);
    }
    await request(
      `/webhooks/${this.d!.application_id}/${this.d!.token}/messages/@original`,
      "PATCH",
      this.client.token,
      {
        ...payload,
      },
    );
    return null;
  }
  public async fetchReply() {
    if (!this.replied && !this.deferred) {
      throw new Error(Messages.INTERACTION_NOT_REPLIED);
    }
    const res = await request(
      `/webhooks/${this.d!.application_id}/${this.d!.token}/messages/@original`,
      "GET",
      this.client.token,
    );
    return new ClientMessage(
      await res.json(),
      this.client.token,
      this.client,
    );
  }
  public async deleteReply() {
    if (!this.replied && !this.deferred) {
      throw new Error(Messages.INTERACTION_NOT_REPLIED);
    }
    await request(
      `/webhooks/${this.d!.application_id}/${this.d!.token}/messages/@original`,
      "DELETE",
      this.client.token,
    );
    return null;
  }

  public async deferUpdate() {
    await request(
      `/interactions/${this.d!.id}/${this.d!.token}/callback`,
      "POST",
      this.client.token,
      { type: InteractionResponseType.DeferredMessageUpdate },
    );
    this.deferred = true;
    return null;
  }
}
