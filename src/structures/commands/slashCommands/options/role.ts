import {
	APIApplicationCommandRoleOption,
	ApplicationCommandOptionType,
	APIApplicationCommandOptionChoice,
} from "../../../../types/mod.ts";
import { BaseCommandOption } from "./base.ts";

export class RoleOption extends BaseCommandOption {
	option: APIApplicationCommandRoleOption = {
		type: ApplicationCommandOptionType.Role,
		description_localizations: undefined,
		name_localizations: undefined,
	} as APIApplicationCommandRoleOption;
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
