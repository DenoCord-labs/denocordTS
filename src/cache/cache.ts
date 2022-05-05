import { cacheFields } from "../types/mod.ts";
import { Channel, Emoji, Guild, Role, User, Member } from "../types/cache.ts";
import { toCamelCase } from "../helpers/mod.ts";
import { camelize } from "../../deps.ts";
export class Cache {
  cache: cacheFields;
  constructor() {
    this.cache = {
      channels: {},
      emojis: {},
      guilds: {},
      users: {},
      roles: {},
      members: {},
    };
  }

  /**
   * Add a guild to the cache.
   */
  addGuildToCache(guildId: string, guildPayload: Guild) {
    this.cache.guilds[guildId] = camelize(guildPayload) as any;
  }
  /**
   * Add a User to the cache.
   */
  addUserToCache(userId: string, userPayload: User) {
    this.cache.users[userId] = camelize(userPayload);
  }
  /**
   * Add a channel to the cache.
   */
  addChannelToCache(channelId: string, channel: Channel) {
    this.cache.channels[channelId] = camelize(channel);
  }
  /**
   * Add an emoji to the cache.
   */
  addEmojiToCache(emojiId: string, emoji: Emoji) {
    this.cache.emojis[emojiId] = camelize(emoji);
  }
  /**
   * Add a role to the cache.
   */
  addRoleToCache(roleId: string, role: Role) {
    this.cache.roles[roleId] = camelize(role);
  }
  public getGuild(guildId: string) {
    return this.cache.guilds[guildId] ? this.cache.guilds[guildId] : undefined;
  }
  public getChannel(channelId: string) {
    return this.cache.channels[channelId]
      ? this.cache.channels[channelId]
      : undefined;
  }
  public getUser(userId: string) {
    return this.cache.users[userId] ? this.cache.users[userId] : undefined;
  }
  public getEmoji(emojiId: string) {
    return this.cache.emojis[emojiId] ? this.cache.emojis[emojiId] : undefined;
  }
  public getRole(roleId: string) {
    return this.cache.roles[roleId] ? this.cache.roles[roleId] : undefined;
  }
}
