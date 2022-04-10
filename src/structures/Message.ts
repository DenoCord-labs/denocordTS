import { MessageWithDelete } from "../types/Message.ts";
import { ReplyPayload } from "../types/ReplyPayload.ts";
import { ApiRequest } from "../helpers/request.ts";
import { BASE_API_URL } from "../constants/index.ts";
export class Message {
  /**
   * Represents a Message with functions to interact with it
   */
  constructor(public msg: MessageWithDelete, private token: string) {}
  /**
   *
   * @param {ReplyPayload} payload The payload to send
   */
  async reply(payload: ReplyPayload) {
    if (payload.components && payload.components?.length > 5) {
      throw new Error("You can only add 5 ActionRows to a Message");
    }
    const message = await new ApiRequest(
      `${BASE_API_URL}/channels/${this.msg.channel_id}/messages`,
      "POST",
      payload,
      this.token
    ).send();
    const obj: MessageWithDelete = {
      ...(await message.json()),
      delete: this.delete,
    };
    return new Message(obj, this.token);
  }
  async delete() {
    await new ApiRequest(
      `${BASE_API_URL}/channels/${this.msg.channel_id}/messages/${this.msg.id}`,
      "DELETE",
      {},
      this.token
    ).send();
  }
}
