import { APIButtonComponent, APISelectMenuComponent } from "../../types/mod.ts";
import { SelectMenu } from "../../../mod.ts";
export class ActionRow {
	private components: (APISelectMenuComponent | APIButtonComponent)[] = [];
	constructor() {}
	addComponents(
		...components: (APISelectMenuComponent | APIButtonComponent)[]
	) {
		components.forEach((component) => {
			this.components.push(component);
		});
		return this;
	}
	create() {
		if (this.components.length === 0) {
			throw new Error("No components added to ActionRow");
		}
		if (
			this.components.length > 1 &&
			this.components[0] instanceof SelectMenu
		) {
			throw new Error(
				"You can't add more than one SelectMenu to an ActionRow",
			);
		}
		if (this.components.length > 5) {
			throw new Error(
				"You can't add more than 5 components to an ActionRow",
			);
		}
		return {
			type: 1,
			components: this.components,
		};
	}
}
