import { Client } from "../../client/client.ts";
import { ButtonInteraction } from "./classes/Button.ts";
import { SelectMenuInteraction } from "./classes/SelectMenu.ts";
export class ComponentCollector {
	private target = new EventTarget();
	constructor(
		private client: Client,
		private channelId: string,
		private disposeInterval?: number,
	) {
		this.client.on("InteractionCreate", async (e: any) => {
			if (
				e.type == 3 &&
				e.channelId == this.channelId &&
				e.data.component_type == 2
			) {
				this.target.dispatchEvent(
					new CustomEvent("buttonInteraction", {
						detail: new ButtonInteraction(
							this.client,
							this.channelId,
							e,
						),
					}),
				);
			} else if (
				e.type == 3 &&
				e.channelId == this.channelId &&
				e.data.component_type == 3
			) {
				this.target.dispatchEvent(
					new CustomEvent("selectMenuInteraction", {
						detail: new SelectMenuInteraction(
							this.client,
							this.channelId,
							e,
						),
					}),
				);
			}
		});
	}
	waitForInteraction({
		listener,
		type,
		once,
	}: {
		type: "buttonInteraction" | "selectMenuInteraction";
		listener: (e: any) => any;
		once?: boolean;
	}) {
		this.target.addEventListener(
			type,
			listener,
			once ? { once: true } : {},
		);
		if (this.disposeInterval) {
			setTimeout(() => {
				this.target.removeEventListener(type, listener);
			}, this.disposeInterval);
		}
	}
}
