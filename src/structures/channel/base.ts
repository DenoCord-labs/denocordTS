import { APIPartialChannel, Snowflake } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
import { ClientMessage, Message } from "../mod.ts";
import { request } from "../../rest/request.ts";
export class BaseChannel implements APIPartialChannel {
	id: APIPartialChannel["id"];
	type: APIPartialChannel["type"];
	name: APIPartialChannel["name"];
	constructor(data: any, private client: Base) {
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
		await request(`/channels/${this.id}`, "DELETE", this.client.token, {
			undefined,
			headers,
		});
		return null;
	}
	async send(content: Omit<ReplyPayload, "message_reference">) {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const res = await request(
			`/channels/${this.id}/messages`,
			"POST",
			this.client.token,
			{
				body: JSON.stringify(content),
				headers,
			},
		);
		return new ClientMessage(
			await res.json(),
			this.client.token,
			this.client,
		);
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
		await request(
			`/channels/${this.id}/messages/${messageId}`,
			"DELETE",
			this.client.token,
			undefined,
			headers,
		);
	}
	/**
	 * Minimum 2, Maximum 100
	 */
	async bulkDeleteMessages(count: number) {
		if (count < 2) {
			throw new Error("Minimum 2 messages can be bulk deleted");
		}
		if (count > 100) {
			throw new Error("Maximum 100 messages can be bulk deleted");
		}
		return void (await request(
			`/channels/${this.id}/messages/bulk-delete`,
			"POST",
			this.client.token,
		));
	}
	async sendTyping() {
		return void (await request(
			`/channels/${this.id}/typing`,
			"POST",
			this.client.token,
		));
	}
	async getPinnedMessages(): Promise<Message[]> {
		const res = await (
			await request(`/channels/${this.id}/pins`, "GET", this.client.token)
		).json();
		return res.map(
			(m: any) => new Message(m, this.client.token, this.client),
		);
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
		await request(
			`/channels/${this.id}/pins/${messageId}`,
			"PUT",
			this.client.token,
			undefined,
			headers,
		);
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
		await request(
			`/channels/${this.id}/pins/${messageId}`,
			"DELETE",
			this.client.token,
			undefined,
			headers,
		);
	}
}
