import { APIPartialChannel, Snowflake } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
import { ClientMessage, Message } from "../mod.ts";
import {
	unpinMessage,
	pinMessage,
	deleteMessage,
} from "../../http/endpoints.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";
import { RestClient } from "../../http/mod.ts";
export class BaseChannel implements APIPartialChannel {
	id: APIPartialChannel["id"];
	type: APIPartialChannel["type"];
	name: APIPartialChannel["name"];
	protected restClient = new RestClient();
	constructor(data: any, protected client: Base) {
		if (!window.token) throw new Error("No token found");
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
		await this.restClient.request(
			endpoints.deleteOrCloseChannel(this.id),
			"DELETE",
			undefined,
			headers
		);
		return null;
	}
	async send(content: Omit<ReplyPayload, "message_reference">) {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const res = await this.restClient.request(
			endpoints.createMessage(this.id),
			"POST",
			content,
			headers
		);
		return new ClientMessage(await res.json(), window.token!, this.client);
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
		await deleteMessage(this.id, messageId, headers);
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
		return void (await this.restClient.request(
			endpoints.bulkDeleteMessages(this.id),
			"POST",
			{
				messages: messageIds,
			}
		));
	}
	async sendTyping() {
		return void (await this.restClient.request(
			endpoints.triggerTypingIndicator(this.id),
			"POST"
		));
	}
	async getPinnedMessages(): Promise<(Message | ClientMessage)[]> {
		const res = await (
			await this.restClient.request(`/channels/${this.id}/pins`, "GET")
		).json();
		return res.map((m: any) => {
			if (m.webhook_id) return new Message(m, this.client);
			if (m.author.id === this.client.user.id)
				return new ClientMessage(m, window.token!, this.client);
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
		await pinMessage(this.id, messageId, headers);
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
		await unpinMessage(this.id, messageId, headers);
	}
}
