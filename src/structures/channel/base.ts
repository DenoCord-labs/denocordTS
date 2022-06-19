import { APIPartialChannel, Snowflake } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
import { ClientMessage, Message } from "../mod.ts";
import {
  deleteMessage,
  pinMessage,
  unpinMessage,
} from "../../http/endpoints.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";
import { ComponentCollector } from "../collectors/mod.ts";
export class BaseChannel implements APIPartialChannel {
  id: APIPartialChannel["id"];
  type: APIPartialChannel["type"];
  name: APIPartialChannel["name"];
  constructor(data: any, protected client: Base) {
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
  }
  /**
   * For Community guilds, the Rules or Guidelines channel and the Community Updates channel cannot be deleted.
   */
  async closeChannel(reason?: string) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await this.client.rest.request(
      endpoints.deleteOrCloseChannel(this.id),
      "DELETE",
      undefined,
      headers,
    );
    return null;
  }
  async send(content: Omit<ReplyPayload, "message_reference">) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await this.client.rest.request(
      endpoints.createMessage(this.id),
      "POST",
      content,
      headers,
    );
    return new ClientMessage(await res.json(), this.client);
  }
  async deleteMessage({
    messageId,
    reason,
  }: {
    reason?: string;
    messageId: Snowflake;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await deleteMessage(this.id, messageId, this.client.rest, headers);
  }
  /**
   * Minimum 2, Maximum 100
   */
  async bulkDeleteMessages(messageIds: Snowflake[]) {
    if (messageIds.length < 2) {
      throw new Error("Minimum 2 messages can be bulk deleted");
    }
    if (messageIds.length > 100) {
      throw new Error("Maximum 100 messages can be bulk deleted");
    }
    return void (await this.client.rest.request(
      endpoints.bulkDeleteMessages(this.id),
      "POST",
      {
        messages: messageIds,
      },
    ));
  }
  async sendTyping() {
    return void (await this.client.rest.request(
      endpoints.triggerTypingIndicator(this.id),
      "POST",
    ));
  }
  async getPinnedMessages(): Promise<(Message | ClientMessage)[]> {
    const res = await (
      await this.client.rest.request(`/channels/${this.id}/pins`, "GET")
    ).json();
    return res.map((m: any) => {
      if (m.webhook_id) return new Message(m, this.client);
      if (m.author.id === this.client.user.id) {
        return new ClientMessage(m, this.client);
      }
    });
  }
  async pinMessage({
    messageId,
    reason,
  }: {
    reason?: string;
    messageId: Snowflake;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await pinMessage(this.id, messageId, this.client.rest, headers);
  }
  async unPinMessage({
    messageId,
    reason,
  }: {
    reason?: string;
    messageId: Snowflake;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await unpinMessage(this.id, messageId, this.client.rest, headers);
  }
  createMessageComponentsCollector() {
    return new ComponentCollector(this.client, this.id);
  }
}
