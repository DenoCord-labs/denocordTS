import { User } from "./User.ts";
import { PermissionOverwrites } from "./PermissionOverrwrites.ts";
import { ThreadMetadata } from "./ThreadMetadata.ts";
import { ThreadMember } from "./ThreadMember.ts";
export type Channel = {
  id: string;
  type: ChannelType;
  guild_id?: string;
  position: number;
  permission_overwrites: PermissionOverwrites[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: User[];
  icon?: string;
  owner_id?: string;
  application_id?: string;
  parent_id?: string;
  last_pin_timestamp?: string;
  rtc_region?: string;
  video_quality_mode: number;
  message_count?: number;
  thread_metadata: ThreadMetadata;
  member: ThreadMember;
  default_auto_archive_duration?: number;
  permissions?: string;
  flags?: number;
};

export enum ChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_NEWS = 5,
  GUILD_NEWS_THREAD = 10,
  GUILD_PUBLIC_THREAD = 11,
  GUILD_PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15
}
