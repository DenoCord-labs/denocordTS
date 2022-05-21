import { Client } from "../../client/client.ts";
import { ButtonInteraction } from "./classes/Button.ts";
import { SelectMenuInteraction } from "./classes/SelectMenu.ts";
import { events } from "../../../deps.ts";
type CollectorEvents = {
	buttonInteraction: [interaction: ButtonInteraction];
	selectMenuInteraction: [interaction: SelectMenuInteraction];
};
export class ComponentCollector extends events.EventEmitter<CollectorEvents> {
	constructor(
		private client: Client,
		private channelId: string,
	) {
		super();
		this.client.on("InteractionCreate", async (e: any) => {
			if (
				e.type == 3 &&
				e.channelId == this.channelId &&
				e.data.component_type == 2
			) {
				super.emit(
					"buttonInteraction",
					new ButtonInteraction(this.client, this.channelId, e),
				);
			} else if (
				e.type == 3 &&
				e.channelId == this.channelId &&
				e.data.component_type == 3
			) {
				super.emit(
					"selectMenuInteraction",
					new SelectMenuInteraction(this.client, this.channelId, e),
				);
			}
		});
	}
}
