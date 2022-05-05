import { cacheFields } from "../types/mod.ts";
import { Channel, Emoji, Guild, Role, User, Member } from "../types/cache.ts";
import { toCamelCase } from "../helpers/mod.ts";
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
    const guildObject = {} as Guild;
    for (const key of Object.keys(guildPayload)) {
      //@ts-ignore
      guildObject[toCamelCase(key)] = guildPayload[key];
    }
    this.cache.guilds[guildId] = guildObject;
  }
  /**
   * Add a User to the cache.
   */
  addUserToCache(userId: string, userPayload: User) {
    const userObject = {} as User;
    for (const key of Object.keys(userPayload)) {
      //@ts-ignore
      userObject[toCamelCase(key)] = userPayload[key];
    }
    this.cache.users[userId] = userObject;
  }
  /**
   * Add a channel to the cache.
   */
  addChannelToCache(channelId: string, channel: Channel) {
    const channelObject = {} as Channel;
    for (const key of Object.keys(channel)) {
      //@ts-ignore next-line
      channelObject[toCamelCase(key)] = channel[key];
    }
    this.cache.channels[channelId] = channelObject;
  }
  /**
   * Add an emoji to the cache.
   */
  addEmojiToCache(emojiId: string, emoji: Emoji) {
    const emojiObject = {} as Emoji;
    for (const key of Object.keys(emoji)) {
      //@ts-ignore next-line
      emojiObject[toCamelCase(key)] = emoji[key];
    }
    this.cache.emojis[emojiId] = emojiObject;
  }
  /**
   * Add a role to the cache.
   */
  addRoleToCache(roleId: string, role: Role) {
    const roleObject = {} as Role;
    for (const key of Object.keys(role)) {
      //@ts-ignore next-line
      roleObject[toCamelCase(key)] = role[key];
    }
    this.cache.roles[roleId] = roleObject;
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
