import {
  DmChannel,
  Guild,
  GuildEmoji,
  GuildMember as Member,
  Role as APIRole,
  TextChannel,
  ThreadChannel,
  User,
} from "../structures/mod.ts";
import { Collection } from "../../deps.ts";
export type Channel = DmChannel | TextChannel | ThreadChannel;

export type Emoji = GuildEmoji;
export type Role = APIRole;
export type cacheFields = {
  guilds: Collection<string, Guild>;
  channels: Collection<string, DmChannel | TextChannel | ThreadChannel>;
  users: Collection<string, User>;
  emojis: Collection<string, Emoji>;
  roles: Collection<string, Role>;
  members: Collection<string, Member>;
};
