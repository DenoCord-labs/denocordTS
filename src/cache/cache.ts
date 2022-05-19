import { cacheFields } from "../types/mod.ts";
import { Channel, Emoji, Guild, Role, User } from "../types/cache.ts";
import { camelize, Collection } from "../../deps.ts";
export class Cache {
	cache: cacheFields;
	constructor() {
		this.cache = {
			channels: new Collection(),
			emojis: new Collection(),
			guilds: new Collection(),
			users: new Collection(),
			roles: new Collection(),
			members: new Collection(),
		};
	}

	/**
	 * Add a guild to the cache.
	 */
	addGuildToCache(guildId: string, guildPayload: Guild) {
		this.cache.guilds.set(guildId, camelize(guildPayload));
	}
	/**
	 * Add a User to the cache.
	 */
	addUserToCache(userId: string, userPayload: User) {
		this.cache.users.set(userId, camelize(userPayload));
	}
	/**
	 * Add a channel to the cache.
	 */
	addChannelToCache(channelId: string, channel: Channel) {
		this.cache.channels.set(channelId, camelize(channel));
	}
	/**
	 * Add an emoji to the cache.
	 */
	addEmojiToCache(emojiId: string, emoji: Emoji) {
		this.cache.emojis.set(emojiId, camelize(emoji));
	}
	/**
	 * Add a role to the cache.
	 */
	addRoleToCache(roleId: string, role: Role) {
		this.cache.roles.set(roleId, camelize(role));
	}
	public getGuild(guildId: string) {
		return this.cache.guilds.get(guildId);
	}
	public getChannel(channelId: string) {
		return this.cache.channels.get(channelId);
	}
	public getUser(userId: string) {
		return this.cache.users.get(userId);
	}
	public getEmoji(emojiId: string) {
		return this.cache.emojis.get(emojiId);
	}
	public getRole(roleId: string) {
		return this.cache.roles.get(roleId);
	}
}
