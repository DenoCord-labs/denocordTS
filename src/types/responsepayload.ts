import { ActionRow, Embed, Attachment } from "../structures/mod.ts";
export type ResponsePayload = {
  content?: string;
  components?: ActionRow[];
  embeds?: Embed[];
  allowed_mentions?: {
    parse: string[];
    users?: string[];
    roles?: string[];
  };
  attachments?: Attachment[];
  message_reference?: MessageReference;
  flags?: number;
};

export type ReplyPayload = ResponsePayload & {
  ephemeral?: boolean;
  suppress_embeds?: boolean;
};

export type MessageReference = {
  channel_id: string;
  message_id: string;
  guild_id: string;
};
