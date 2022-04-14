import { Interaction } from "./Interaction.ts";
import { Message } from "../types/Message.ts";
import { ReplyData, ReplyPayload } from "../types/ReplyPayload.ts";
import {
  APIMessageComponentButtonInteraction,
  APIMessageComponentSelectMenuInteraction,
} from "../types/mod.ts";
export type Payload = APIMessageComponentButtonInteraction & functions;
export type functions = {
  deferReply: (payload?: { ephemeral?: boolean }) => Promise<void>;
  reply: (payload: ReplyData) => Promise<void>;
  editReply: (payload: ReplyPayload) => Promise<void>;
  deleteReply: () => Promise<void>;
  followUp: (payload: ReplyPayload) => Promise<void>;
  fetchFollowUp: () => Promise<Message>;
  editFollowUp: (payload: ReplyPayload) => Promise<void>;
  deleteFollowUp: () => Promise<void>;
};
export type SelectMenuInteraction = APIMessageComponentSelectMenuInteraction &
  functions;
export class ButtonInteraction extends Interaction {
  deferred = false;
  // deno-lint-ignore no-explicit-any
  constructor(protected d: any) {
    super(d);
  }
  generate() {
    const payload = this.create();
    const obj = {
      ...payload,
    };
    return obj;
  }
}
