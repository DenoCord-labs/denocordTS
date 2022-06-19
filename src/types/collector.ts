import { ReplyPayload } from "./responsepayload.ts";
import { ClientMessage } from "../structures/mod.ts";
import { ButtonInteraction } from "../structures/collectors/classes/Button.ts";
import { SelectMenuInteraction } from "../structures/collectors/classes/SelectMenu.ts";
type ComponentFunctions = {
  reply: (e: ReplyPayload) => unknown;
  deferReply: (e: { ephemeral?: boolean }) => unknown;
  editReply: (e: ReplyPayload) => unknown;
  deleteReply: () => unknown;
  followUp: (e: ReplyPayload) => unknown;
  fetchFollowUp: () => Promise<ClientMessage>;
  deferUpdate: () => unknown;
  deleteFollowUp: () => unknown;
  editFollowUp: (e: ReplyPayload) => unknown;
  fetchReply: () => Promise<ClientMessage>;
};
export type CollectorEvents = {
  buttonInteraction: (collected: ButtonInteraction) => unknown;
  selectMenuInteraction: (collected: SelectMenuInteraction) => unknown;
};
