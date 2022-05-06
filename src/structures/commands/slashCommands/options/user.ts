import {
	APIApplicationCommandUserOption,
	ApplicationCommandOptionType,
} from "../../../../types/mod.ts";
import { BaseCommandOption } from "./base.ts";

export class UserOption extends BaseCommandOption {
	option: APIApplicationCommandUserOption = {
		type: ApplicationCommandOptionType.User,
		description_localizations: undefined,
		name_localizations: undefined,
	} as APIApplicationCommandUserOption;
	constructor() {
		super();
	}
	setName(name: string) {
		this.option.name = name;
		return this;
	}
	setDescription(desc: string) {
		this.option.description = desc;
		return this;
	}
	setRequired(required: boolean) {
		this.option.required = required;
		return this;
	}
	override toJSON() {
		super.validate({
			description: this.option.description,
			name: this.option.name,
		});
		return super.toJSON(this.option);
	}
}
