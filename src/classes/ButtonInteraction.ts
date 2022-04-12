import { Interaction } from "./Interaction.ts";
import { GuildMember } from "../types/GuildMember.ts";
import { User } from "../types/User.ts";
import { Message } from "../types/Message.ts";
import { ReplyPayload } from "../types/ReplyPayload.ts";
export type Payload = {
  application_id: string;
  guild_id: string;
  channel_id: string;
  member: GuildMember;
  user: User;
  message: Message;
  deferReply: (payload: { ephemeral?: boolean }) => Promise<void>;
  reply: (payload: ReplyPayload) => Promise<void>;
  editReply: (payload: ReplyPayload) => Promise<void>;
  deleteReply: () => Promise<void>;
  followUp: (payload: ReplyPayload) => Promise<void>;
  fetchFollowUp: () => Promise<Message>;
  editFollowUp: (payload: ReplyPayload) => Promise<void>;
  deleteFollowUp: () => Promise<void>;
};
export class ButtonInteraction extends Interaction {
  deferred = false;
  // deno-lint-ignore no-explicit-any
  constructor(protected d: any) {
    super(d);
  }
  generate() {
    const payload = this.create();
    const obj = {
      application_id: payload.application_id,
      guild_id: payload.guild_id,
      channel_id: payload.channel_id,
      member: payload.member,
      user: payload.user,
      message: payload.message,
      deferReply: this.deferReply.bind(this),
      reply: this.reply.bind(this),
      editReply: this.editReply.bind(this),
      deleteReply: this.deleteReply.bind(this),
      followUp: this.followUp.bind(this),
      fetchFollowUp: this.fetchFollowUp.bind(this),
      editFollowUp: this.editFollowUp.bind(this),
      deleteFollowUp: this.deleteFollowUp.bind(this),
    };
    return obj;
  }
}
