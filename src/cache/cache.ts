import { APIGuild, cacheFields } from "../types/mod.ts";
import { Channel, Emoji } from "../types/cache.ts";
import { Camelize, camelize, ChannelType, Collection } from "../../deps.ts";
import { Base } from "../client/base.ts";
import {
  DmChannel,
  Guild as GuildClass,
  GuildEmoji,
  Role,
  TextChannel,
  ThreadChannel,
  User as UserClass,
} from "../structures/mod.ts";
import { channelCreateEventHandler } from "../events/mod.ts";
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
  async addGuildToCache(guildId: string, guildPayload: Camelize<APIGuild>) {
    await this.cache.guilds.set(
      guildId,
      new GuildClass(camelize(guildPayload), this.client),
    );
  }
  /**
   * Add a User to the cache.
   */
  addUserToCache(userId: string, userPayload: Camelize<UserClass>) {
    this.cache.users.set(
      userId,
      new UserClass(camelize(userPayload), this.client),
    );
  }
  /**
   * Add a channel to the cache.
   */
  addChannelToCache(channel: Channel) {
    switch (channel.type) {
      case ChannelType.DM: {
        this.client.cache.channels.set(
          channel.id as string,
          new DmChannel(channel, this.client),
        );
        break;
      }
      case ChannelType.GuildText: {
        this.client.cache.channels.set(
          channel.id as string,
          new TextChannel(channel, this.client),
        );
        break;
      }
      case ChannelType.GuildPrivateThread: {
        this.client.cache.channels.set(
          channel.id as string,
          new ThreadChannel(channel, this.client),
        );
        break;
      }
      case ChannelType.GuildPublicThread: {
        this.client.cache.channels.set(
          channel.id as string,
          new ThreadChannel(channel, this.client),
        );
        break;
      }
    }
  }
  /**
   * Add an emoji to the cache.
   */
  addEmojiToCache(emojiId: string, emoji: GuildEmoji) {
    this.cache.emojis.set(emojiId, emoji);
  }
  /**
   * Add a role to the cache.
   */
  addRoleToCache(roleId: string, role: Role) {
    this.cache.roles.set(roleId, role);
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
