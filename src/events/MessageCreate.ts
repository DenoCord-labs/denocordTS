import { Base } from "../client/base.ts";
import { Message } from "../structures/mod.ts";
import { GatewayMessageCreateDispatchData } from "../types/mod.ts";
export function MessageCreateGatewayEventHandler(
  data: GatewayMessageCreateDispatchData,
  client: Base,
) {
  if (data.webhook_id) return;
  if (data.author.id !== client.user.id) {
    const message = new Message(data, client);
    client.emit("MessageCreate", message);
  }
}
