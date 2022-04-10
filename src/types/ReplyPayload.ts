import { Embed } from "./Embed.ts";
import { MessageActionRow } from "./ActionRow.ts";
export type ReplyPayload = {
  content?: string;
  components?: MessageActionRow[];
  embeds?: Embed[];
  allowed_mentions?: boolean;
  attachments?: any[];
  message_reference?: MessageReference;
};

export type MessageReference = {
  channel_id: string;
  message_id: string;
  guild_id: string;
};
