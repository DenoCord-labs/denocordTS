import { Message as MessageType } from "../types/Message.ts";
import { ReplyPayload } from "../types/ReplyPayload.ts";
import { ApiRequest } from "../helpers/request.ts";
import { BASE_API_URL } from "../constants/index.ts";
export class Message {
  /**
   * Represents a Message with functions to interact with it
   */
  constructor(public msg: MessageType, private token: string) {}
  /**
   *
   * @param {ReplyPayload} payload The payload to send
   * @returns {Promise<MessageType>} The sent message
   */
  async reply(payload: ReplyPayload): Promise<MessageType> {
    const message = await new ApiRequest(
      `${BASE_API_URL}/channels/${this.msg.channel_id}/messages`,
      "POST",
      payload,
      this.token
    ).send();
    return message.json();
  }
}
