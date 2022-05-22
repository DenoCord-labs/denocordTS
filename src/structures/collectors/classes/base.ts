import {
	APIMessageComponentButtonInteraction,
	InteractionResponseType,
} from "../../../types/mod.ts";
import { ReplyPayload } from "../../../types/responsepayload.ts";
import { ClientMessage } from "../../messages/ClientMessage.ts";
import { Messages } from "../../../errors/messages.ts";
import { Base } from "../../../client/base.ts";
import { RestClient } from "../../../http/rest.ts";
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
	public customId: string
	public readonly clientId!:
		APIMessageComponentButtonInteraction["application_id"];
	protected restClient = new RestClient();
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
		this.customId = this.d.data.custom_id;
	}
	public async deferReply(ephemeral?: boolean) {
		this.deferred = true;
		const data = ephemeral
			? {
				flags: 1 << 6,
			}
			: {};
		await this.restClient.request(
			`/interactions/${this.d!.id}/${this.d!.token}/callback`,
			"POST",
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
		await this.restClient.request(
			`/interactions/${this.d!.id}/${this.d!.token}/callback`,
			"POST",
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
		await this.restClient.request(
			`/webhooks/${this.d!.application_id}/${this.d!.token
			}/messages/@original`,
			"PATCH",
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
		const res = await this.restClient.request(
			`/webhooks/${this.d!.application_id}/${this.d!.token
			}/messages/@original`,
			"GET",
		);
		return new ClientMessage(await res.json(), window.token!, this.client);
	}
	public async deleteReply() {
		if (!this.replied && !this.deferred) {
			throw new Error(Messages.INTERACTION_NOT_REPLIED);
		}
		await this.restClient.request(
			`/webhooks/${this.d!.application_id}/${this.d!.token
			}/messages/@original`,
			"DELETE",
		);
		return null;
	}

	public async deferUpdate() {
		await this.restClient.request(
			`/interactions/${this.d!.id}/${this.d!.token}/callback`,
			"POST",
			{ type: InteractionResponseType.DeferredMessageUpdate },
		);
		this.deferred = true;
		return null;
	}
}
