import { ClientMessage } from "../structures/messages/mod.ts";
import { BaseMessage } from "../structures/messages/Base.ts";
import {
  APIMessageComponentButtonInteraction,
  APIMessageComponentSelectMenuInteraction,
  APIThreadMember,
  Channel,
  GatewayChannelPinsUpdateDispatchData,
  GatewayGuildBanAddDispatchData,
  GatewayGuildDeleteDispatchData,
  GatewayGuildMemberRemoveDispatchData,
  GatewayInviteCreateDispatchData,
  GatewayInviteDeleteDispatchData,
  GatewayPresenceUpdateDispatchData,
  GatewayThreadMembersUpdateDispatchData,
  GatewayThreadMemberUpdateDispatchData,
  GatewayTypingStartDispatchData,
  GatewayWebhooksUpdateDispatchData,
} from "./mod.ts";
import {
  ApplicationCommandInteraction,
  Guild,
  GuildEmoji,
  GuildMember,
  GuildSticker,
  Role,
  ThreadChannel,
  User,
} from "../structures/mod.ts";

import { Camelize } from "../../deps.ts";

export type GatewayEvents = {
  ChannelCreate: (
    e: Channel,
  ) => unknown;
  ChannelDelete: (
    e: Channel,
  ) => unknown;
  ChannelPinsUpdate: (
    e: Camelize<GatewayChannelPinsUpdateDispatchData>,
  ) => unknown;
  ChannelUpdate: (
    e: { oldChannel: Channel | undefined; newChannel: Channel },
  ) => unknown;
  GuildBanAdd: (e: Camelize<GatewayGuildBanAddDispatchData>) => unknown;
  GuildBanRemove: (e: unknown) => unknown;
  GuildCreate: (e: Guild) => unknown;
  GuildDelete: (e: Camelize<GatewayGuildDeleteDispatchData>) => unknown;
  GuildEmojisUpdate: (e: {
    /**
     * The Id of the guild
     */
    guildId: string;
    /**
     * Updated Emojis
     */
    emojis: GuildEmoji[];
  }) => unknown;
  GuildIntegrationsUpdate: (e: unknown) => unknown;
  GuildMemberAdd: (e: {
    guildId: string;
    member: GuildMember;
  }) => unknown;
  GuildMemberRemove: (
    e: Camelize<GatewayGuildMemberRemoveDispatchData>,
  ) => unknown;
  GuildMembersChunk: (e: unknown) => unknown;
  GuildMemberUpdate: (e: GuildMember) => unknown;
  GuildRoleCreate: (e: Role) => unknown;
  GuildRoleDelete: (
    e: Omit<
      Role,
      | "setName"
      | "setColor"
      | "setPermissions"
      | "setPosition"
      | "setHoist"
      | "setMentionable"
      | "setUnicodeEmoji"
    >,
  ) => unknown;
  GuildRoleUpdate: (e: Role) => unknown;
  GuildStickersUpdate: (e: {
    /**
     * Array of stickers
     */
    stickers: GuildSticker[];
    /**
     * Id of the Guild
     */
    guildId: string;
  }) => unknown;
  GuildUpdate: (e: { newGuild: Guild; oldGuild: Guild }) => unknown;
  IntegrationCreate: (e: unknown) => unknown;
  IntegrationDelete: (e: unknown) => unknown;
  IntegrationUpdate: (e: unknown) => unknown;
  InteractionCreate: (
    e:
      | APIMessageComponentButtonInteraction
      | APIMessageComponentSelectMenuInteraction,
  ) => unknown;
  InviteCreate: (e: Camelize<GatewayInviteCreateDispatchData>) => unknown;
  InviteDelete: (e: unknown) => unknown;
  MessageCreate: (e: ClientMessage | BaseMessage) => unknown;
  MessageDelete: (e: {
    /**
     * The Guild Id where Messages we're deleted
     */
    guildId?: string;
    /**
     * The Channel Id where Messages we're deleted
     */
    channelId: string;
    /**
     * An Array of Message Id's
     */
    id: string;
  }) => unknown;
  MessageDeleteBulk: (e: {
    /**
     * The Guild Id where Messages we're deleted
     */
    guildId: string;
    /**
     * The Channel Id where Messages we're deleted
     */
    channelId: string;
    /**
     * An Array of Message Id's
     */
    ids: string[];
  }) => unknown;
  MessageReactionAdd: (e: unknown) => unknown;
  MessageReactionRemove: (e: unknown) => unknown;
  MessageReactionRemoveAll: (e: unknown) => unknown;
  MessageReactionRemoveEmoji: (e: unknown) => unknown;
  MessageUpdate: (e: unknown) => unknown;
  PresenceUpdate: (e: Camelize<GatewayPresenceUpdateDispatchData>) => unknown;
  StageInstanceCreate: (
    e: Camelize<GatewayInviteDeleteDispatchData>,
  ) => unknown;
  StageInstanceDelete: (e: unknown) => unknown;
  StageInstanceUpdate: (e: unknown) => unknown;
  Ready: (e: undefined) => unknown;
  ThreadCreate: (e: ThreadChannel) => unknown;
  ThreadDelete: (e: unknown) => unknown;
  ThreadListSync: (e: {
    /**
     * The Id of the Guild
     */
    guildId: string;
    /**
     * the parent channel ids whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channel_ids that have no active threads as well, so you know to clear that data.
     */
    channelIds?: string[];
    /**
     * Threads
     */
    threads: ThreadChannel[];
    /**
     * all thread member objects from the synced threads for the current user, indicating which threads the current user has been added to
     */
    members: Camelize<APIThreadMember>;
  }) => unknown;
  ThreadMembersUpdate: (
    e: Camelize<GatewayThreadMembersUpdateDispatchData>,
  ) => unknown;
  ThreadMemberUpdate: (
    e: Camelize<GatewayThreadMemberUpdateDispatchData>,
  ) => unknown;
  ThreadUpdate: (
    e: { oldThread: ThreadChannel; newThread: ThreadChannel },
  ) => unknown;
  TypingStart: (e: Camelize<GatewayTypingStartDispatchData>) => unknown;
  UserUpdate: (e: User) => unknown;
  VoiceServerUpdate: (e: unknown) => unknown;
  VoiceStateUpdate: (e: unknown) => unknown;
  WebhooksUpdate: (e: Camelize<GatewayWebhooksUpdateDispatchData>) => unknown;
  GuildScheduledEventCreate: (e: unknown) => unknown;
  GuildScheduledEventUpdate: (e: unknown) => unknown;
  GuildScheduledEventDelete: (e: unknown) => unknown;
  GuildScheduledEventUserAdd: (e: unknown) => unknown;
  GuildScheduledEventUserRemove: (e: unknown) => unknown;
  CommandInteraction: (e: ApplicationCommandInteraction) => unknown;
  Error: (e: unknown) => unknown;
};
