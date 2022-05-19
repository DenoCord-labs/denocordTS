import {
	APIBan,
	APIGuild,
	APIRole,
	ChannelType,
	PermissionFlagsBits,
	Snowflake,
} from "../../types/mod.ts";
import { Camelize, camelize } from "../../../deps.ts";
import { Base } from "../../client/base.ts";
import { GuildMember, TextChannel, ThreadChannel } from "../mod.ts";
import { ColorResolvable, resolveColor } from "../../utils/mod.ts";
import { RestClient } from "../../http/rest.ts";
import { camelToSnakeCase } from "../../helpers/caseConversion.ts";
interface GuildProperties extends Camelize<APIGuild> {
	channnels: (TextChannel | ThreadChannel)[];
}

export class Guild {
	iconHash: GuildProperties["iconHash"];
	discoverySplash: GuildProperties["discoverySplash"];
	owner: GuildProperties["owner"];
	ownerId: GuildProperties["ownerId"];
	permissions: GuildProperties["permissions"];
	region: GuildProperties["region"];
	afkChannelId: GuildProperties["afkChannelId"];
	afkTimeout: GuildProperties["afkTimeout"];
	widgetEnabled: GuildProperties["widgetEnabled"];
	widgetChannelId: GuildProperties["widgetChannelId"];
	verificationLevel: GuildProperties["verificationLevel"];
	defaultMessageNotifications: GuildProperties["defaultMessageNotifications"];
	explicitContentFilter: GuildProperties["explicitContentFilter"];
	roles: GuildProperties["roles"];
	emojis: GuildProperties["emojis"];
	features: GuildProperties["features"];
	mfaLevel: GuildProperties["mfaLevel"];
	systemChannelId: GuildProperties["systemChannelId"];
	systemChannelFlags: GuildProperties["systemChannelFlags"];
	rulesChannelId: GuildProperties["rulesChannelId"];
	joinedAt: GuildProperties["joinedAt"];
	large: GuildProperties["large"];
	memberCount: GuildProperties["memberCount"];
	voiceStates: GuildProperties["voiceStates"];
	members: GuildProperties["members"];
	channels: (TextChannel | ThreadChannel)[];
	threads: GuildProperties["threads"];
	presences: GuildProperties["presences"];
	maxPresences: GuildProperties["maxPresences"];
	maxMembers: GuildProperties["maxMembers"];
	vanityUrlCode: GuildProperties["vanityUrlCode"];
	description: GuildProperties["description"];
	banner: GuildProperties["banner"];
	premiumTier: GuildProperties["premiumTier"];
	premiumSubscriptionCount: GuildProperties["premiumSubscriptionCount"];
	preferredLocale: GuildProperties["preferredLocale"];
	publicUpdatesChannelId: GuildProperties["publicUpdatesChannelId"];
	maxVideoChannelUsers: GuildProperties["maxVideoChannelUsers"];
	approximateMemberCount: GuildProperties["approximateMemberCount"];
	approximatePresenceCount: GuildProperties["approximatePresenceCount"];
	welcomeScreen: GuildProperties["welcomeScreen"];
	nsfwLevel: GuildProperties["nsfwLevel"];
	stageInstances: GuildProperties["stageInstances"];
	stickers: GuildProperties["stickers"];
	premiumProgressBarEnabled: GuildProperties["premiumProgressBarEnabled"];
	guildScheduledEvents: GuildProperties["guildScheduledEvents"];
	hubType: GuildProperties["hubType"];
	name: string;
	icon: string | null;
	splash: string | null;
	unavailable: GuildProperties["unavailable"];
	id: GuildProperties["id"];
	private rest = new RestClient();
	constructor(data: Camelize<APIGuild>, private client: Base) {
		// deno-lint-ignore no-explicit-any
		const d: Record<string, any> = {};
		Object.keys(data).map((key) => {
			// @ts-expect-error
			d[camelToSnakeCase(key)] = data[key];
		});
		this.afkChannelId = d.afk_channel_id;
		this.afkTimeout = d.afk_timeout;
		this.approximateMemberCount = d.approximate_member_count;
		this.approximatePresenceCount = d.approximate_presence_count;
		this.banner = d.banner;
		this.defaultMessageNotifications = d.default_message_notifications;
		this.description = d.description;
		this.discoverySplash = d.discovery_splash;
		this.emojis = d.emojis;
		this.explicitContentFilter = d.explicit_content_filter;
		this.features = d.features;
		this.iconHash = d.icon_hash;
		this.id = d.id;
		this.joinedAt = d.joined_at;
		this.large = d.large;
		this.maxMembers = d.max_members;
		this.maxPresences = d.max_presences;
		this.maxVideoChannelUsers = d.max_video_channel_users;
		this.members = d.members;
		this.mfaLevel = d.mfa_level;
		this.name = d.name;
		this.owner = d.owner;
		this.ownerId = d.owner_id;
		this.premiumSubscriptionCount = d.premium_subscription_count;
		this.premiumTier = d.premium_tier;
		this.presences = d.presences;
		this.publicUpdatesChannelId = d.public_updates_channel_id;
		this.rulesChannelId = d.rules_channel_id;
		this.roles = d.roles;
		this.rulesChannelId = d.rules_channel_id;
		this.systemChannelId = d.system_channel_id;
		this.systemChannelFlags = d.system_channel_flags;
		this.systemChannelId = d.system_channel_id;
		this.vanityUrlCode = d.vanity_url_code;
		this.verificationLevel = d.verification_level;
		this.voiceStates = d.voice_states;
		this.widgetChannelId = d.widget_channel_id;
		this.widgetEnabled = d.widget_enabled;
		this.welcomeScreen = d.welcome_screen;
		this.nsfwLevel = d.nsfw_level;
		this.stageInstances = d.stage_instances;
		this.stickers = d.stickers;
		this.premiumProgressBarEnabled = d.premium_progress_bar_enabled;
		this.guildScheduledEvents = d.guild_scheduled_events;
		this.hubType = d.hub_type;
		this.icon = d.icon;
		this.splash = d.splash;
		this.unavailable = d.unavailable;
		this.verificationLevel = d.verification_level;
		this.region = d.region;
		this.preferredLocale = d.preferred_locale;
		this.channels = [];
		d.channels.map((channel: Record<string, unknown>) => {
			switch (channel.type) {
				case 0: {
					this.channels!.push(new TextChannel(channel, this.client));
					break;
				}
				case 11: {
					this.channels!.push(
						new ThreadChannel(channel, this.client)
					);
					break;
				}
				case 12: {
					this.channels!.push(
						new ThreadChannel(channel, this.client)
					);
					break;
				}
			}
		});
	}
	async createChannel({
		channelType,
		name,
		parentId,
		autoArchiveDuration,
		bitrate,
		nsfw,
		position,
		slowMode,
		topic,
		userLimit,
		reason,
	}: {
		/**
		 * The name of the channel
		 */
		name: string;
		/**
		 * The Type of the channel
		 */
		channelType: keyof typeof ChannelType;
		/**
		 * Topic of the channel
		 */
		topic?: string;
		/**
		 * Bitrate (in bits) of the voice channel
		 */
		bitrate?: number;
		/**
		 * User Limit of the voice channel
		 */
		userLimit?: number;
		/**
		 * SlowMode Duration
		 * Value must be between `0 - 21600`
		 */
		slowMode?: number;
		/**
		 * Position of the channel in the category
		 */
		position?: number;
		/**
		 * Id of the Category
		 */
		parentId: Snowflake;
		/**
		 * Whether the channel is nsfw
		 */
		nsfw?: boolean;
		/**
		 * Duration in minutes to archive the thread automatically
		 * Available Values: `60` | `1440` | `10080` | `43200`
		 */
		autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
		/**
		 * The Reason to Create this channel
		 */
		reason?: string;
	}) {
		const headers = new Headers();
		if (reason) {
			headers.append("X-Audit-Log-Reason", reason);
		}
		const body: Record<string, string | number | boolean> = {};
		body["name"] = name;
		body["parent_id"] = parentId;
		body["topic"] = topic || "";
		body["type"] = ChannelType[channelType];
		body["rate_limit_per_user"] = slowMode || 0;
		if (position) {
			body["position"] = position;
		}
		body["nsfw"] = Boolean(nsfw);
		if (
			body.type == ChannelType["GuildVoice"] ||
			body.type == ChannelType["GuildStageVoice"]
		) {
			if (!bitrate)
				throw new Error("Bitrate is required for voice channels");

			body["bitrate"] = bitrate;
			if (userLimit) body["user_limit"] = userLimit;
		}
		if (
			body.type == ChannelType["GuildPrivateThread"] ||
			body.type == ChannelType["GuildNewsThread"] ||
			body.type == ChannelType["GuildPublicThread"]
		) {
			if (autoArchiveDuration) {
				body["default_auto_arhive_duration"] = autoArchiveDuration;
			}
		}
		return await this.rest.request(
			`/guilds/${this.id}/channels`,
			"POST",
			body,
			headers
		);
	}
	async changeChannelPosition({
		channelId,
		position,
		lockPermissions,
		parentId,
		reason,
	}: {
		channelId: Snowflake;
		position: number;
		parentId?: Snowflake;
		lockPermissions?: boolean;
		reason?: string;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		const body: Record<string, Snowflake | boolean | number> = {};
		body["id"] = channelId;
		if (position) body["position"] = position;
		body["lock_permissions"] = lockPermissions || true;
		if (parentId) body["parent_id"] = parentId;
		await this.rest.request(
			`/guilds/${this.id}/channels`,
			"PATCH",

			body,
			reason ? headers : undefined
		);
	}
	async fetchGuildMember(userId: Snowflake) {
		const res = await (
			await this.rest.request(
				`/guilds/${this.id}/members/${userId}`,
				"GET"
			)
		).json();

		return new GuildMember(
			res,
			this.client,
			this.client.cache.guilds.get(`${this.id}`)?.ownerId === res.user?.id
		) as Partial<GuildMember>;
	}
	async changeClientNickname({
		nickname,
		reason,
	}: {
		nickname: string;
		reason?: string;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		return void (await this.rest.request(
			`/guilds/${this.id}/members/@me`,
			"PATCH",

			{ nick: nickname },
			reason ? headers : undefined
		));
	}
	async addRoleToGuildMember({
		roleId,
		userId,
		reason,
	}: {
		userId: Snowflake;
		roleId: Snowflake;
		reason?: string;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		return void (await this.rest.request(
			`/guilds/${this.id}/members/${userId}/roles/${roleId}`,
			"PUT",

			undefined,
			reason ? headers : undefined
		));
	}
	async removeRoleFromGuildMember({
		roleId,
		userId,
		reason,
	}: {
		reason?: string;
		userId: Snowflake;
		roleId: Snowflake;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		return void (await this.rest.request(
			`/guilds/${this.id}/members/${userId}/roles/${roleId}`,
			"DELETE",

			undefined,
			reason ? headers : undefined
		));
	}
	async removeGuildMember({
		userId,
		reason,
	}: {
		userId: Snowflake;
		reason?: string;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		return void (await this.rest.request(
			`/guilds/${this.id}/members/${userId}`,
			"DELETE",

			undefined,
			reason ? headers : undefined
		));
	}
	/**
	 * Used to fetch Guild Bans, Will fetch top 10 if limit isn't specified
	 */
	async fetchGuildBans(limit?: number) {
		const body: Record<string, number> = {};
		body["limit"] = limit || 10;
		return camelize(
			await (
				await this.rest.request(`/guilds/${this.id}/bans`, "GET")
			).json()
		) as Camelize<APIBan>[];
	}

	async fetchGuildBan({ userId }: { userId: Snowflake }) {
		return camelize(
			await await (
				await this.rest.request(
					`/guilds/${this.id}/bans/${userId}`,
					"GET"
				)
			).json()
		) as Camelize<APIBan>;
	}

	async createBan({
		userId,
		reason,
	}: {
		userId: Snowflake;
		reason?: string;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		return void (await this.rest.request(
			`/guilds/${this.id}/bans/${userId}`,
			"PUT",

			undefined,
			reason ? headers : undefined
		));
	}
	async removeGuildBan({
		userId,
		reason,
	}: {
		userId: Snowflake;
		reason?: string;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		return void (await this.rest.request(
			`/guilds/${this.id}/bans/${userId}`,
			"DELETE",

			undefined,
			headers
		));
	}
	async fetchRoles() {
		return camelize(
			await (
				await this.rest.request(`/guilds/${this.id}/roles`, "GET")
			).json()
		) as Camelize<APIRole>[];
	}

	async createRole({
		name,
		permission,
		color,
		displaySeparatelyInSidebar,
		mentionable,
		reason,
	}: {
		name: string;
		permission: (keyof typeof PermissionFlagsBits)[];
		color?: ColorResolvable;
		displaySeparatelyInSidebar?: boolean;
		mentionable?: boolean;
		reason?: string;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		const body: Record<string, string | number | boolean> = {};
		body["name"] = name;
		let permissions = 0n;
		for await (const perm of permission) {
			permissions |= PermissionFlagsBits[perm];
		}
		body["permissions"] = String(permissions);
		body["color"] = color ? (resolveColor(color) as number) : 0;
		body["hoist"] = displaySeparatelyInSidebar || false;
		body["mentionable"] = mentionable || false;
		return camelize(
			await (
				await this.rest.request(
					`/guilds/${this.id}/roles`,
					"POST",

					body,
					headers
				)
			).json()
		) as Camelize<APIRole>;
	}
	async modifyRole({
		name,
		permission,
		color,
		displaySeparatelyInSidebar,
		mentionable,
		reason,
		roleId,
	}: {
		name: string;
		permission: (keyof typeof PermissionFlagsBits)[];
		color?: ColorResolvable;
		displaySeparatelyInSidebar?: boolean;
		mentionable?: boolean;
		reason?: string;
		roleId: Snowflake;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		const body: Record<string, number | string | boolean> = {};
		body["name"] = name;
		let permissions = 0n;
		for await (const perm of permission) {
			permissions |= PermissionFlagsBits[perm];
		}
		body["permissions"] = String(permissions);
		body["color"] = color ? (resolveColor(color) as number) : 0;
		body["hoist"] = displaySeparatelyInSidebar || false;
		body["mentionable"] = mentionable || false;
		return camelize(
			await (
				await this.rest.request(
					`/guilds/${this.id}/roles/${roleId}`,
					"PATCH",

					body,
					headers
				)
			).json()
		) as Camelize<APIRole>;
	}
	async deleteRole({
		roleId,
		reason,
	}: {
		roleId: Snowflake;
		reason?: string;
	}) {
		const headers = new Headers();
		if (reason) headers.append("X-Audit-Log-Reason", reason);
		return void (await this.rest.request(
			`/guilds/${this.id}/roles/${roleId}`,
			"DELETE",

			undefined,
			headers
		));
	}
}
