import { APIMessage, APIUser, Snowflake } from "../../types/mod.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
import { Messages } from "../../errors/messages.ts";
import { discordFetch } from "../../rest/mod.ts";
import { ClientMessage } from "./mod.ts";
import { parseEmoji } from "../../utils/mod.ts";
import { Member } from "../../types/cache.ts";
import { camelize } from "../../../deps.ts";
import { Base } from "../../client/base.ts";
export class BaseMessage {
	/**
	 * Id of the Message
	 */
	id: Snowflake;
	/**
	 * ID of the channel the message was sent in
	 */
	channelId: Snowflake;
	/**
	 * ID of the channel the message was sent in
	 */
	guildId?: Snowflake;
	/**
	 * The author of this message (only a valid user in the case where the message is generated by a user or bot user)
	 *
	 * If the message is generated by a webhook, the author object corresponds to the webhook's id,
	 * username, and avatar. You can tell if a message is generated by a webhook by checking for the `webhook_id` property
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object
	 */
	author: APIUser;
	/**
	 * Member properties for this message's author
	 *
	 * The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events
	 * from text-based guild channels
	 *
	 * See https://discord.com/developers/docs/resources/guild#guild-member-object
	 */
	member?: Member & { permissions: number };
	/**
	 * Contents of the message
	 */
	content: string;
	/**
	 * When this message was sent
	 */
	timestamp: string;
	/**
	 * When this message was edited (or null if never)
	 */
	editedTimestamp: string | null;
	/**
	 * Whether this was a TTS message
	 */
	tts: boolean;
	/**
	 * Whether this message mentions everyone
	 */
	mentionEveryone: boolean;
	/**
	 * Users specifically mentioned in the message
	 *
	 * The `member` field is only present in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events
	 * from text-based guild channels
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object
	 * See https://discord.com/developers/docs/resources/guild#guild-member-object
	 */
	mentions: APIMessage["mentions"];
	/**
	 * Roles specifically mentioned in this message
	 *
	 * See https://discord.com/developers/docs/topics/permissions#role-object
	 */
	mentionRoles: APIMessage["mention_roles"];
	/**
	 * Channels specifically mentioned in this message
	 *
	 * Not all channel mentions in a message will appear in `mention_channels`.
	 * - Only textual channels that are visible to everyone in a lurkable guild will ever be included
	 * - Only crossposted messages (via Channel Following) currently include `mention_channels` at all
	 *
	 * If no mentions in the message meet these requirements, this field will not be sent
	 *
	 * See https://discord.com/developers/docs/resources/channel#channel-mention-object
	 */
	mentionChannels?: APIMessage["mention_channels"];
	/**
	 * Any attached files
	 *
	 * See https://discord.com/developers/docs/resources/channel#attachment-object
	 */
	attachments: APIMessage["attachments"];
	/**
	 * Any embedded content
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object
	 */
	embeds: APIMessage["embeds"];
	/**
	 * Reactions to the message
	 *
	 * See https://discord.com/developers/docs/resources/channel#reaction-object
	 */
	reactions?: APIMessage["reactions"];
	/**
	 * A nonce that can be used for optimistic message sending (up to 25 characters)
	 *
	 * **You will not receive this from further fetches. This is received only once from a `MESSAGE_CREATE`
	 * event to ensure it got sent**
	 */
	nonce?: APIMessage["nonce"];
	/**
	 * Whether this message is pinned
	 */
	pinned: boolean;
	/**
	 * If the message is generated by a webhook, this is the webhook's id
	 */
	webhookId?: Snowflake;
	/**
	 * Type of message
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-types
	 */
	type: APIMessage["type"];
	/**
	 * Sent with Rich Presence-related chat embeds
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure
	 */
	activity?: APIMessage["activity"];
	/**
	 * Sent with Rich Presence-related chat embeds
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-application-structure
	 */
	application?: APIMessage["application"];
	/**
	 * If the message is a response to an Interaction, this is the id of the interaction's application
	 */
	application_id?: Snowflake;
	/**
	 * Reference data sent with crossposted messages, replies, pins, and thread starter messages
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure
	 */
	messageReference?: APIMessage["message_reference"];
	/**
	 * Message flags combined as a bitfield
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object-message-flags
	 *
	 * See https://en.wikipedia.org/wiki/Bit_field
	 */
	flags?: APIMessage["flags"];
	/**
	 * The message associated with the `message_reference`
	 *
	 * This field is only returned for messages with a `type` of `19` (REPLY).
	 *
	 * If the message is a reply but the `referenced_message` field is not present,
	 * the backend did not attempt to fetch the message that was being replied to,
	 * so its state is unknown.
	 *
	 * If the field exists but is `null`, the referenced message was deleted
	 *
	 * See https://discord.com/developers/docs/resources/channel#message-object
	 */
	referencedMessage?: APIMessage["referenced_message"];
	/**
	 * Sent if the message is a response to an Interaction
	 */
	interaction?: APIMessage["interaction"];
	/**
	 * Sent if a thread was started from this message
	 */
	thread?: APIMessage["thread"];
	/**
	 * Sent if the message contains components like buttons, action rows, or other interactive components
	 */
	components?: APIMessage["components"];
	/**
	 * Sent if the message contains stickers
	 *
	 * See https://discord.com/developers/docs/resources/sticker#sticker-item-object
	 */
	stickerItems?: APIMessage["sticker_items"];
	constructor(
		public d: APIMessage,
		private readonly token: string,
		private client: Base,
	) {
		this.id = d.id;
		this.channelId = d.channel_id;
		this.guildId = d.guild_id;
		this.author = d.author;
		this.content = d.content;
		this.timestamp = d.timestamp;
		this.editedTimestamp = d.edited_timestamp;
		this.tts = d.tts;
		this.mentions = d.mentions;
		this.mentionRoles = d.mention_roles;
		this.mentionChannels = d.mention_channels;
		this.attachments = d.attachments;
		this.embeds = d.embeds;
		this.reactions = d.reactions;
		this.webhookId = d.webhook_id;
		this.nonce = d.nonce;
		this.pinned = d.pinned;
		this.type = d.type;
		this.activity = d.activity;
		this.application = d.application;
		this.application_id = d.application_id;
		this.messageReference = d.message_reference;
		this.flags = d.flags;
		this.referencedMessage = d.referenced_message;
		this.interaction = d.interaction;
		this.thread = d.thread;
		this.components = d.components;
		this.stickerItems = d.sticker_items;
		this.mentionEveryone = d.mention_everyone;
		let permissions: number | undefined;
		if (d.member) {
			for (const role of d.member.roles) {
				const rolePermission = parseInt(
					this.client.cache.roles.get(role)
						? this.client.cache.roles.get(role)!.permissions
						: "0",
				);
				if (permissions) {
					permissions |= rolePermission;
				} else {
					permissions = rolePermission;
				}
			}
		}
		this.member = d.member
			? {
				...camelize(d.member),
				permissions: permissions as number,
			}
			: undefined;
	}
	async reply(payload: ReplyPayload & { ping?: boolean; inline?: boolean }) {
		this.checks(payload);
		const body: ReplyPayload = {
			...payload,
			message_reference: {
				channel_id: this.d.channel_id,
				guild_id: this.d.guild_id!,
				message_id: this.d.id,
			},
			allowed_mentions: payload.inline ? { parse: [] } : undefined,
		};
		const request = await discordFetch(
			`/channels/${this.d.channel_id}/messages`,
			"POST",
			this.token,
			body,
		);
		const msg = new ClientMessage(
			await request.json(),
			this.token,
			this.client,
		);
		return msg;
	}
	async delete(reason?: string) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		await discordFetch(
			`/channels/${this.d.channel_id}/messages/${this.d.id}`,
			"DELETE",
			this.token,
			{},
			headers,
		);
	}
	async addReaction(emoji: string) {
		await discordFetch(
			`/channels/${this.d.channel_id}/messages/${this.d.id}/reactions/${
				parseEmoji(emoji)
			}/@me`,
			"PUT",
			this.token,
			{},
		);
		return null;
	}
	async removeClientReaction(emoji: string) {
		await discordFetch(
			`/channels/${this.d.channel_id}/messages/${this.d.id}/reactions/${
				parseEmoji(emoji)
			}/@me`,
			"DELETE",
			this.token,
			{},
		);
		return null;
	}
	async removeUserReaction(emoji: string, userId: Snowflake) {
		await discordFetch(
			`/channels/${this.d.channel_id}/messages/${this.d.id}/reactions/${
				parseEmoji(emoji)
			}/${userId}`,
			"DELETE",
			this.token,
			{},
		);
		return null;
	}
	async getReactions(emoji: string) {
		const request = await discordFetch(
			`/channels/${this.d.channel_id}/messages/${this.d.id}/reactions/${
				parseEmoji(emoji)
			}`,
			"GET",
			this.token,
			{},
		);
		return request.json();
	}
	async deleteAllReactions() {
		await discordFetch(
			`/channels/${this.d.channel_id}/messages/${this.d.id}/reactions`,
			"DELETE",
			this.token,
			{},
		);
		return null;
	}
	async deleteAllReactionsByEmoji(emoji: string) {
		await discordFetch(
			`/channels/${this.d.channel_id}/messages/${this.d.id}/reactions/${
				parseEmoji(emoji)
			}`,
			"DELETE",
			this.token,
			{},
		);
		return null;
	}
	async sendTyping() {
		await discordFetch(
			`/channels/${this.d.channel_id}/typing`,
			"POST",
			this.token,
			{},
		);
		return null;
	}
	async pinMessage(reason?: string) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		await discordFetch(
			`/channels/${this.d.channel_id}/pins/${this.d.id}`,
			"PUT",
			this.token,
			{},
			headers,
		);
		return null;
	}
	async unpinMessage(reason?: string) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		await discordFetch(
			`/channels/${this.d.channel_id}/pins/${this.d.id}`,
			"DELETE",
			this.token,
			{},
			headers,
		);
		return null;
	}
	async startThreadFromMessage(reason?: string) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		const request = await discordFetch(
			`/channels/${this.d.channel_id}/messages/${this.d.id}/threads`,
			"PUT",
			this.token,
			{},
			headers,
		);
		return request.json();
	}
	async createNewThread(reason?: string) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		const request = await discordFetch(
			`/channels/${this.d.channel_id}/threads`,
			"POST",
			this.token,
			{},
			headers,
		);
		return request.json();
	}
	private checks(payload: ReplyPayload) {
		if (payload.components && payload.components.length > 5) {
			throw new Error(
				Messages.COMPONENTS_LENGTH_EXCEEDED(payload.components.length),
			);
		}
		if (payload.embeds && payload.embeds.length > 10) {
			throw new Error(
				Messages.EMBEDS_LENGTH_EXCEEDED(payload.embeds.length),
			);
		}
	}
}
