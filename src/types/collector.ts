import { ReplyPayload } from "./responsepayload.ts";
import { ClientMessage } from "../structures/mod.ts";
import { ButtonInteraction } from "../structures/collectors/classes/Button.ts";
import { SlashMenuInteraction } from "../structures/collectors/classes/SelectMenu.ts";
type ComponentFunctions = {
  reply: (e: ReplyPayload) => any;
  deferReply: (e: { ephemeral?: boolean }) => any;
  editReply: (e: ReplyPayload) => any;
  deleteReply: () => any;
  followUp: (e: ReplyPayload) => any;
  fetchFollowUp: () => Promise<ClientMessage>;
  deferUpdate: () => any;
  deleteFollowUp: () => any;
  editFollowUp: (e: ReplyPayload) => any;
  fetchReply: () => Promise<ClientMessage>;
};
export type CollectorEvents = {
  buttonInteraction: (collected: ButtonInteraction) => any;
  selectMenuInteraction: (collected: SlashMenuInteraction) => any;
};
