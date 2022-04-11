// deno-lint-ignore-file no-explicit-any
import { MessageWithDelete } from "./Message.ts";
import { Guild } from "./Guild.ts";
export type GatewayEvents = {
  ready(): void;
  error(e: any): void;
  message(e: MessageWithDelete): void;
  guildCreate(g: Guild): void;
};

export type TextChannel = {
  type: 0;
  topic: string | null;
  rate_limit_per_user: number;
  position: number;
  permission_overwrites: [];
  parent_id: string | null;
  nsfw: boolean;
  name: string;
  last_message_id: string | null;
  id: string;
};
export type VoiceChannel = {
  type: 2;
  user_limit: number;
  position: number;
  permission_overwrites: [];
  parent_id: string | null;
  name: string;
  last_message_id: string | null;
  id: string;
  bitrate: number;
};

export type Channel = TextChannel & VoiceChannel;

export type MessageCreatePayload = {
  tts: boolean;
  type: 0;
  timestamp: string;
  referenced_message: null;
  pinned: boolean;
  mention_everyone: boolean;
  mentions: [];
  mention_roles: [];
  mention_channels: [];
  member: {
    nick: string | null;
    roles: string[];
    joined_at: string;
    mute: boolean;
    deaf: boolean;
  };
  content: string;
};
