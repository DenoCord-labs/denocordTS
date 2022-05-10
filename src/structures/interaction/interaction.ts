import { discordFetch } from "../../rest/mod.ts";
import {
	APIInteraction,
	APIInteractionResponseCallbackData,
	APIMessage,
	InteractionResponseType,
	MessageFlags,
} from "../../types/mod.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
import { Messages } from "../../errors/messages.ts";
import { Camelize, camelize } from "../../../deps.ts";
export class Interaction {
	protected deferred = false;
	protected replied = false;
	isComponentInteraction = false;
	isAutoComplete = false;
	isCommand = false;
	isModalSubmit = false;
	constructor(
		protected interaction: APIInteraction & { locale: string },
		protected token: string
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
	}
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
		await discordFetch(
			`/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
			"POST",
			this.token,
			{
				type: InteractionResponseType.ChannelMessageWithSource,
				data: {
					...payload,
					embeds: payload.embeds
						? payload.embeds.map((emb) => emb.toJSON())
						: [],
					components: payload.components
						? payload.components.map((c) => {
								const components = c.components;
								c.removeAllComponents();
								c.addComponents(
									components.map((component) =>
										component.toJSON()
									) as any
								);
								return c;
						  })
						: [],
				},
			}
		);
	}
	async deferReply(payload = { ephemeral: false }) {
		if (this.deferred) {
			throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
		}
		if (this.replied) throw new Error(Messages.INTERACTION_ALREADY_REPLIED);
		this.deferred = true;
		const { ephemeral } = payload;
		await discordFetch(
			`/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
			"POST",
			this.token,
			{
				type: InteractionResponseType.DeferredChannelMessageWithSource,
				ephemeral,
			}
		);
	}
	async editReply(payload: ReplyPayload) {
		if (!this.replied && !this.deferred) {
			throw new Error(Messages.INTERACTION_NOT_REPLIED);
		}

		const r = await discordFetch(
			`/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/@original`,
			"PATCH",
			this.token,
			{
				...payload,
				embeds: payload.embeds
					? payload.embeds.map((emb) => emb.toJSON())
					: [],
				components: payload.components
					? payload.components.map((c) => {
							const components = c.components;
							c.removeAllComponents();
							c.addComponents(
								components.map((component) =>
									component.toJSON()
								) as any
							);
							return c;
					  })
					: [],
			}
		);
		return camelize(await r.json()) as Camelize<APIMessage>;
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
			`/webhooks/${this.interaction.application_id}/${this.interaction.token}`,
			"GET",
			this.token,
			{ ...payload }
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

	async editFollowUp(payload: ReplyPayload) {
		await discordFetch(
			`/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/${this.interaction.message?.id}`,
			"PATCH",
			this.token,
			{
				...payload,
				embeds: payload.embeds
					? payload.embeds.map((emb) => emb.toJSON())
					: [],
				components: payload.components
					? payload.components.map((c) => {
							const components = c.components;
							c.removeAllComponents();
							c.addComponents(
								components.map((component) =>
									component.toJSON()
								) as any
							);
							return c;
					  })
					: [],
			}
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
			...payload,
		};
		return camelize(obj);
	}
}
