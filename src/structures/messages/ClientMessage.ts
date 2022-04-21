import { BaseMessage } from "./Base.ts";
import { APIMessage } from "../../../deps.ts";
import { ApiRequest } from "../../rest/mod.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
export class ClientMessage extends BaseMessage {
	clientToken?: string;
	constructor(d: APIMessage, token: string) {
		super(d, token);
		this.clientToken = token;
	}
	async edit(content: ReplyPayload) {
		const req = new ApiRequest(
			`/channels/${this.d.channel_id}/messages/${this.d.id}`,
			"PATCH",
			content,
			this.clientToken,
		);
		const res = await req.send();
		return await res.json();
	}
}
