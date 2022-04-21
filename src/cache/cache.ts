import {
  APIChannel,
  APIEmoji,
  APIGuild,
  APIRole,
  APIUser,
} from "../../deps.ts";
import { cacheFields } from "../types/mod.ts";
export class Cache {
  cache: cacheFields;
  constructor() {
    this.cache = {
      channels: {},
      emojis: {},
      guilds: {},
      users: {},
      roles: {},
      getChannel: (channelId: string) => this.getChannel(channelId),
      getGuild: (guildId: string) => this.getGuild(guildId),
      getUser: (userId: string) => this.getUser(userId),
      getEmoji: (emojiId: string) => this.getEmoji(emojiId),
      getRole: (roleId: string) => this.getRole(roleId),
    };
  }

  /**
   * Add a guild to the cache.
   */
  addGuildToCache(guildId: string, guildPayload: APIGuild) {
    this.cache.guilds[guildId] = guildPayload;
  }
  /**
   * Add a User to the cache.
   */
  addUserToCache(userId: string, userPayload: APIUser) {
    this.cache.users[userId] = userPayload;
  }
  /**
   * Add a channel to the cache.
   */
  addChannelToCache(channelId: string, channel: APIChannel) {
    this.cache.channels[channelId] = channel;
  }
  /**
   * Add an emoji to the cache.
   */
  addEmojiToCache(emojiId: string, emoji: APIEmoji) {
    this.cache.emojis[emojiId] = emoji;
  }
  /**
   * Add a role to the cache.
   */
  addRoleToCache(roleId: string, role: APIRole) {
    this.cache.roles[roleId] = role;
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
