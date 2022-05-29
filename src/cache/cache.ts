import { APIGuild, cacheFields } from "../types/mod.ts";
import { Channel, Emoji } from "../types/cache.ts";
import { Camelize, camelize, ChannelType, Collection } from "../../deps.ts";
import { Base } from "../client/base.ts";
import {
  DmChannel,
  Guild,
  Guild as GuildClass,
  GuildEmoji,
  GuildMember,
  Role,
  TextChannel,
  ThreadChannel,
  User,
  User as UserClass,
} from "../structures/mod.ts";
import { channelCreateEventHandler } from "../events/mod.ts";
export class Cache {
  channels = new Collection<string, Channel>()
  emojis = new Collection<string, Emoji>()
  guilds = new Collection<string, Guild>()
  users = new Collection<string, User>()
  roles = new Collection<string, Role>()
  members = new Collection<string, GuildMember>()
  constructor(protected client: Base) {
  }

  /**
   * Add a guild to the cache.
   */
  addGuildToCache(guildId: string, guildPayload: Camelize<APIGuild>) {
    this.guilds.set(
      guildId,
      new GuildClass(guildPayload, this.client),
    );
  }
  /**
   * Add a User to the cache.
   */
  addUserToCache(userId: string, userPayload: Camelize<UserClass>) {
    this.users.set(
      userId,
      new UserClass(userPayload, this.client),
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
    this.emojis.set(emojiId, emoji);
  }
  /**
   * Add a role to the cache.
   */
  addRoleToCache(roleId: string, role: Role) {
    this.roles.set(roleId, role);
  }
  public getGuild(guildId: string) {
    return this.guilds.get(guildId);
  }
  public getChannel(channelId: string) {
    return this.channels.get(channelId);
  }
  public getUser(userId: string) {
    return this.users.get(userId);
  }
  public getEmoji(emojiId: string) {
    return this.emojis.get(emojiId);
  }
  public getRole(roleId: string) {
    return this.roles.get(roleId);
  }
}
