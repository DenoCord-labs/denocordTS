// deno-lint-ignore-file no-explicit-any
import { ReplyPayload } from "./ReplyPayload.ts";
export type Message = {
  tts: boolean;
  timestamp: string;
  content: string;
  mentioned_roles: string[] | [];
  mentioned_channels: string[] | [];
  mentioned_users: string[] | [];
  member: {
    nick: string | null;
    roles: string[] | [];
    joined_at: string;
    mute: boolean;
    deaf: boolean;
    hoisted_role: string | null;
  };
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
  reply: (content: ReplyPayload) => Promise<Message>;
};

export type DeletableMessage = Message & {
  delete: () => Promise<any>;
};
