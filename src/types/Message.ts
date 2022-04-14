// deno-lint-ignore-file no-explicit-any
import { InteractionCollector } from "../structures/ComponentCollector.ts";
import { ReplyPayload } from "./ReplyPayload.ts";
import { GuildMember } from "./GuildMember.ts";
import { APITextChannel, APIVoiceChannel } from "./mod.ts";
export type Message = {
  tts: boolean;
  timestamp: string;
  content: string;
  mentioned_roles: string[] | [];
  mentioned_channels: string[] | [];
  mentioned_users: string[] | [];
  member: Partial<GuildMember>;
  id: string;
  flags: number;
  channel_id: string;
  pinned: boolean;
  embeds: any[];
  components: any[];
  author: {
    username: string;
    discriminator: string;
    avatar: string;
    id: string;
    public_flags: number;
  };
  attachments: any[];
  guild_id: string;
  edited_timestamp: string | null;
  reply: (content: ReplyPayload & { ping?: boolean }) => Promise<Message>;
  events: InteractionCollector;
};

export type DeletableMessage = Message & {
  delete: () => Promise<any>;
};
export type ClientMessage = DeletableMessage & {
  edit: (payload: ReplyPayload) => Promise<ClientMessage>;
};
export type MessageChannel = (APITextChannel | APIVoiceChannel) & {
  send: (content: ReplyPayload) => Promise<ClientMessage>;
};
export enum MessageFlags {
  CROSSPOSTED = 1 << 0,
  IS_CROSSPOST = 1 << 1,
  SUPPRESS_EMBEDS = 1 << 2,
  SOURCE_MESSAGE_DELETED = 1 << 3,
  URGENT = 1 << 4,
  HAS_THREAD = 1 << 5,
  EPHEMERAL = 1 << 6,
  LOADING = 1 << 7,
  FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8,
}
