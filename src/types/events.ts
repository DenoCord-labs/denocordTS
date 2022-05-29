import { ClientMessage } from "../structures/messages/mod.ts";
import { BaseMessage } from "../structures/messages/Base.ts";
import {
  APIMessage,
  APIMessageComponentButtonInteraction,
  APIMessageComponentSelectMenuInteraction,
  Channel,
  GatewayChannelPinsUpdateDispatchData,
  GatewayGuildDeleteDispatchData,
} from "./mod.ts";
import {
  ApplicationCommandInteraction,
  DmChannel,
  Guild,
  GuildMember,
  Message,
  Role,
  TextChannel,
  ThreadChannel,
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
    e: { oldChannel: Channel | undefined, newChannel: Channel },
  ) => unknown;
  GuildBanAdd: (e: unknown) => unknown;
  GuildBanRemove: (e: unknown) => unknown;
  GuildCreate: (e: Guild) => unknown;
  GuildDelete: (e: Camelize<GatewayGuildDeleteDispatchData>) => unknown;
  GuildEmojisUpdate: (e: unknown) => unknown;
  GuildIntegrationsUpdate: (e: unknown) => unknown;
  GuildMemberAdd: (e: unknown) => unknown;
  GuildMemberRemove: (e: unknown) => unknown;
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
  GuildStickersUpdate: (e: unknown) => unknown;
  GuildUpdate: (e: { newGuild: Guild, oldGuild: Guild }) => unknown;
  IntegrationCreate: (e: unknown) => unknown;
  IntegrationDelete: (e: unknown) => unknown;
  IntegrationUpdate: (e: unknown) => unknown;
  InteractionCreate: (
    e:
      | APIMessageComponentButtonInteraction
      | APIMessageComponentSelectMenuInteraction,
  ) => unknown;
  InviteCreate: (e: unknown) => unknown;
  InviteDelete: (e: unknown) => unknown;
  MessageCreate: (e: ClientMessage | BaseMessage) => unknown;
  MessageDelete: (e: Message) => unknown;
  MessageDeleteBulk: (e: unknown) => unknown;
  MessageReactionAdd: (e: unknown) => unknown;
  MessageReactionRemove: (e: unknown) => unknown;
  MessageReactionRemoveAll: (e: unknown) => unknown;
  MessageReactionRemoveEmoji: (e: unknown) => unknown;
  MessageUpdate: (e: unknown) => unknown;
  PresenceUpdate: (e: unknown) => unknown;
  StageInstanceCreate: (e: unknown) => unknown;
  StageInstanceDelete: (e: unknown) => unknown;
  StageInstanceUpdate: (e: unknown) => unknown;
  Ready: (e: undefined) => unknown;
  ThreadCreate: (e: ThreadChannel) => unknown;
  ThreadDelete: (e: unknown) => unknown;
  ThreadListSync: (e: unknown) => unknown;
  ThreadMembersUpdate: (e: unknown) => unknown;
  ThreadMemberUpdate: (e: unknown) => unknown;
  ThreadUpdate: (e: { oldThread: ThreadChannel, newThread: ThreadChannel }) => unknown;
  TypingStart: (e: unknown) => unknown;
  UserUpdate: (e: unknown) => unknown;
  VoiceServerUpdate: (e: unknown) => unknown;
  VoiceStateUpdate: (e: unknown) => unknown;
  WebhooksUpdate: (e: unknown) => unknown;
  GuildScheduledEventCreate: (e: unknown) => unknown;
  GuildScheduledEventUpdate: (e: unknown) => unknown;
  GuildScheduledEventDelete: (e: unknown) => unknown;
  GuildScheduledEventUserAdd: (e: unknown) => unknown;
  GuildScheduledEventUserRemove: (e: unknown) => unknown;
  CommandInteraction: (e: ApplicationCommandInteraction) => unknown;
  Error: (e: unknown) => unknown;
};
