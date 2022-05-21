import { cacheFields, APIChannel, APIEmoji, APIGuild, APIRole, APIUser } from "../types/mod.ts";
import { Channel, Emoji, Role } from "../types/cache.ts";
import { Camelize, camelize, Collection } from "../../deps.ts";
import { Base } from '../client/base.ts'
import {Guild as GuildClass,User as UserClass} from '../structures/mod.ts'
export class CacheObject {
	cache: cacheFields;
	constructor(protected client: Base) {
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
	addGuildToCache(guildId: string, guildPayload: Camelize<APIGuild>) {
		this.cache.guilds.set(
			guildId,
			new GuildClass(camelize(guildPayload), this.client)
		);
	}
	/**	
	 * Add a User to the cache.
	 */
	addUserToCache(userId: string, userPayload: Camelize<UserClass>) {
		this.cache.users.set(userId, new UserClass(camelize(userPayload), this.client));
	}
	/**
	 * Add a channel to the cache.
	 */
	addChannelToCache(channelId: string, channel: Channel) {
		// this.cache.channels.set(channelId, camelize(channel));
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


