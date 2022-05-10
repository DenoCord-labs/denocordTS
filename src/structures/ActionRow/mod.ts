import { SelectMenu, Button } from "../../../mod.ts";
export class ActionRow {
	components: (SelectMenu | Button)[] = [];
	constructor() {}
	addComponents(...components: (SelectMenu | Button)[]) {
		components.forEach((component) => {
			this.components.push(component);
		});
		return this;
	}
	toJSON() {
		if (this.components.length === 0) {
			throw new Error("No components added to ActionRow");
		}
		if (
			this.components.length > 1 &&
			this.components[0] instanceof SelectMenu
		) {
			throw new Error(
				"You can't add more than one SelectMenu to an ActionRow"
			);
		}
		if (this.components.length > 5) {
			throw new Error(
				"You can't add more than 5 components to an ActionRow"
			);
		}
		return {
			type: 1,
			components: this.components,
		};
	}
	removeAllComponents() {
		this.components = [];
		return this;
	}
}
