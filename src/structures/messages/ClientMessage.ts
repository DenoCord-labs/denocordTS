import { BaseMessage } from "./Base.ts";
import { APIMessage } from "../../types/mod.ts";
import { RestClient } from "../../http/rest.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
import { Base } from "../../client/base.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";

export class ClientMessage extends BaseMessage {
  clientToken: string;
  private rest = new RestClient();
  constructor(d: APIMessage, client: Base) {
    super(d, client);
    this.clientToken = client.token;
  }
  async edit(content: ReplyPayload) {
    const body = {
      ...content,
    };
    const res = await this.rest.request(
      endpoints.editMessage(this.d.channel_id, this.id),
      "PATCH",
      content,
    );
    return await res.json();
  }
}
