// deno-lint-ignore-file no-explicit-any
import { ReplyPayload } from "./ReplyPayload.ts";
import { GuildMember } from "./GuildMember.ts";
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
  reply: (content: ReplyPayload) => any;
};

export type DeletableMessage = Message & {
  delete: () => Promise<any>;
};
