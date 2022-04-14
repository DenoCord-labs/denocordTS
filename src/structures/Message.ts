import { DeletableMessage } from "../types/Message.ts";
import { ReplyPayload } from "../types/ReplyPayload.ts";
import { ApiRequest } from "../helpers/request.ts";
import { InteractionCollector } from "./ComponentCollector.ts";
import { BaseClient } from "../client/BaseClient.ts";
import { ClientMessage } from "./ClientMessage.ts";
export class Message {
  public events: InteractionCollector;
  /**
   * The Channel where Message is sent
   * `undefined if not fetched`
   * ```js
   * message.channel // Will return an empty object
   * message.fetchChannel() // will add the properties to the object
   * message.channel // Will return the properties
   * ```
   */
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

  async reply(
    payload: ReplyPayload & { ping?: boolean }
  ): Promise<ClientMessage> {
    if (payload.components && payload.components?.length > 5) {
      throw new Error("You can only add 5 ActionRows to a Message");
    }

    const body: ReplyPayload = payload.ping
      ? {
          ...payload,
          message_reference: {
            channel_id: this.msg.channel_id,
            guild_id: this.msg.guild_id,
            message_id: this.msg.id,
          },
        }
      : { ...payload };
    const message = await new ApiRequest(
      `/channels/${this.msg.channel_id}/messages`,
      "POST",
      body,
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
}
