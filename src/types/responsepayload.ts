import {
  APIActionRowComponent,
  APIEmbed,
  APIMessageActionRowComponent,
} from "./mod.ts";

export type ResponsePayload = {
  content?: string;
  components?: APIActionRowComponent<APIMessageActionRowComponent>[];
  embeds?: APIEmbed[];
  allowed_mentions?: boolean;
  attachments?: MessageAttachment[];
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

export type MessageAttachment = {
  id: string;
  filename: string;
  size: number;
  ephemeral?: boolean;
  url: string;
};