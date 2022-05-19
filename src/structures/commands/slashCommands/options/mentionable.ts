import {
	APIApplicationCommandMentionableOption,
	ApplicationCommandOptionType,
} from "../../../../types/mod.ts";
import { BaseCommandOption } from "./base.ts";

export class MentionableOptions extends BaseCommandOption {
	options: APIApplicationCommandMentionableOption = {
		type: ApplicationCommandOptionType.Mentionable,
		description_localizations: undefined,
		name_localizations: undefined,
		required: false,
	} as APIApplicationCommandMentionableOption;
	constructor() {
		super();
	}
	setRequired(required: boolean) {
		this.options.required = required;
		return this;
	}
	setName(name: string) {
		this.options.name = name;
		return this;
	}
	setDescription(desc: string) {
		this.options.description = desc;
		return this;
	}
	override toJSON() {
		super.validate({
			description: this.options.description,
			name: this.options.name,
		});
		return super.toJSON(this.options);
	}
}
