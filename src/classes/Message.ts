import { DeletableMessage } from "../types/Message.ts";
import { ReplyPayload } from "../types/ReplyPayload.ts";
import { ApiRequest } from "../helpers/request.ts";
import { BaseClient } from "../client/BaseClient.ts";
import { InteractionCollector } from "../structures/ComponentCollector.ts";
export class BaseMessage {
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
    this.events = new InteractionCollector(this.client, msg.id);
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
