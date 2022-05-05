import { BaseMessage } from "./Base.ts";
import { APIMessage } from "../../types/mod.ts";
import { discordFetch } from "../../rest/mod.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
export class ClientMessage extends BaseMessage {
	clientToken: string;
	constructor(d: APIMessage, token: string) {
		super(d, token);
		this.clientToken = token;
	}
	async edit(content: ReplyPayload) {
		const res = await discordFetch(
			`/channels/${this.d.channel_id}/messages/${this.d.id}`,
			"PATCH",
			this.clientToken,
			content,
		);
		return await res.json();
	}
}
