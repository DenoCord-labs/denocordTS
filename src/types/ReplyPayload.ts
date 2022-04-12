import { Embed } from "./Embed.ts";
import { MessageActionRow } from "./ActionRow.ts";
export type ReplyPayload = {
  content?: string;
  components?: MessageActionRow[];
  embeds?: Embed[];
  allowed_mentions?: boolean;
  attachments?: MessageAttachment[];
  message_reference?: MessageReference;
  flags?: number;
};

export type ReplyData = {
  content?: string;
  components?: MessageActionRow[];
  embeds?: Embed[];
  allowed_mentions?: boolean;
  attachments?: MessageAttachment[];
  message_reference?: MessageReference;
  ephemeral?: boolean;
  suppress_embeds?: boolean;
};

export type MessageReference = {
  channel_id: string;
  message_id: string;
  guild_id: string;
};

export type MessageAttachment = {
  id: string;
  filename: string;
  size: number;
  ephemeral?: boolean;
  url: string;
};
