import { Embed } from "./Embed.ts";
export type ReplyPayload = {
  content: string;
  components?: any[];
  embeds?: Embed[];
  allowed_mentions?: boolean;
  attachments?: any[];
};
