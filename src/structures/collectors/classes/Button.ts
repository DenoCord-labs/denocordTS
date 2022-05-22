import { BaseComponent } from "./base.ts";
import { Base } from "../../../client/base.ts";
import { APIMessageComponentButtonInteraction } from "../../../types/mod.ts";
export class ButtonInteraction extends BaseComponent {
	constructor(
		client: Base,
		channelId: string,
		d: APIMessageComponentButtonInteraction,
	) {
		super(client, channelId, d);
	}
}
