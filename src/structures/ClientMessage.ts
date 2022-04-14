import { DeletableMessage } from "../types/Message.ts";
import { ReplyPayload } from "../types/ReplyPayload.ts";
import { ApiRequest } from "../helpers/request.ts";
import { InteractionCollector } from "./ComponentCollector.ts";
import { BaseClient } from "../client/BaseClient.ts";
export class ClientMessage {
  public events: InteractionCollector;
  /**
   * Represents a Message with functions to interact with it
   */
  constructor(
    public msg: DeletableMessage,
    private token: string,
    private client: BaseClient
  ) {
    this.events = new InteractionCollector(client, msg.id);
  }
  /**
   *
   * @param {ReplyPayload} payload The payload to send
   */
  async reply(payload: ReplyPayload): Promise<ClientMessage> {
    if (payload.components && payload.components?.length > 5) {
      throw new Error("You can only add 5 ActionRows to a Message");
    }
    const message = await new ApiRequest(
      `/channels/${this.msg.channel_id}/messages`,
      "POST",
      payload,
      this.token
    ).send();

    const obj: DeletableMessage = {
      ...(await message.json()),
      delete: this.delete,
    };

    return new ClientMessage(obj, this.token, this.client);
  }
  async delete() {
    await new ApiRequest(
      `/channels/${this.msg.channel_id}/messages/${this.msg.id}`,
      "DELETE",
      {},
      this.token
    ).send();
  }
  async edit(payload: ReplyPayload) {
    await new ApiRequest(
      `/channels/${this.msg.channel_id}/messages/${this.msg.id}`,
      "PATCH",
      payload,
      this.token
    ).send();
  }
}
