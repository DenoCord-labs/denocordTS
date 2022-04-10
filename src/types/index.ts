// deno-lint-ignore-file no-explicit-any
export type GatewayEvents = {
  ready(): void;
  error(e: any): void;
};

export type GUILDCREATEPAYLOAD = {
  joined_at: string;
  name: string;
  region: "deprecated";
  owner_id: string;
  voice_states: [];
  preferred_locale: string;
  channels: Channel[];
  system_channel_id: string | null;
  features: [] | any;
  afk_channel_id: string | null;
  system_channels_flags: number;
  max_members: number;
  member_count: number;
  max_video_channel_users: number;
  premium_tier: number;
  verification_level: number;
  presences: [];
  unavailable: boolean;
  vanity_url_code: string | null;
  stage_instances: [];
  nsfw: boolean;
  stickers: any;
  lazy: boolean;
  rules_channel_id: string | null;
  premium_progress_bar_enabled: boolean;
  icon: string;
  roles: Role[];
  emojis: Emoji[];
  mfa_level: number;
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

export type Role = {
  unicode_emoji: null | string;
  tags: any;
  position: number;
  permission: number;
  name: string;
  mentionable: boolean;
  managed: boolean;
  id: string;
  icon: string | null;
  hoist: boolean;
  color: number;
};
export type Emoji = {
  roles: string[];
  require_colons: boolean;
  managed: boolean;
  name: string;
  id: string;
  animated: boolean;
  available: boolean;
};

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