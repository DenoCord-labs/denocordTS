import { BaseMessage } from "./Base.ts";
import { APIMessage } from "../../types/mod.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
import { Base } from "../../client/base.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";

export class ClientMessage extends BaseMessage {
  clientToken: string;
  Client
  constructor(public d: APIMessage, client: Base) {
    super(d, client);
    this.Client = client
    this.clientToken = client.token;
  }
  async edit(content: ReplyPayload) {

    const res = await this.Client.rest.request(
      endpoints.editMessage(this.d.channel_id, this.id),
      "PATCH",
      content,
    );
    return await res.json();
  }
}
