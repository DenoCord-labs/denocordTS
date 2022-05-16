import { BaseMessage } from "./Base.ts";
import { APIMessage } from "../../types/mod.ts";
import { request } from "../../rest/mod.ts";
import { ReplyPayload } from "../../types/responsepayload.ts";
import { Base } from "../../client/base.ts";

export class ClientMessage extends BaseMessage {
	clientToken: string;
	constructor(d: APIMessage, token: string, client: Base) {
		super(d, token, client);
		this.clientToken = token;
	}
	async edit(content: ReplyPayload) {
		const body = {
			...content,
			embeds: content.embeds ? content.embeds.map((e) => e.toJSON()) : [],
			components: content.components
				? content.components.map((c) => {
					const components = c.components;
					c.removeAllComponents();
					c.addComponents(
						components.map((component) =>
							component.toJSON()
						) as any,
					);
					return c;
				})
				: [],
		};
		const res = await request(
			`/channels/${this.d.channel_id}/messages/${this.d.id}`,
			"PATCH",
			this.clientToken,
			content,
		);
		return await res.json();
	}
}
