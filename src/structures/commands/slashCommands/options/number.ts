import {
	APIApplicationCommandNumberOption,
	APIApplicationCommandOptionChoice,
	ApplicationCommandOptionType,
} from "../../../../types/mod.ts";
import { BaseCommandOption } from "./base.ts";

export class NumberOptions extends BaseCommandOption {
	choices: APIApplicationCommandOptionChoice<number>[] = [];

	options: APIApplicationCommandNumberOption = {
		type: ApplicationCommandOptionType.Number,
		description_localizations: undefined,
		name_localizations: undefined,
		required: false,
		choices: this.choices,
	} as APIApplicationCommandNumberOption;
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
	setMaxValue(max: number) {
		this.options.max_value = max;
		return this;
	}
	setMinValue(min: number) {
		this.options.min_value = min;
		return this;
	}
	setAutocomplete(autocomplete: boolean) {
		this.options.autocomplete = autocomplete;
		return this;
	}
	addChoice({ name, value }: { name: string; value: number }) {
		this.choices.push({
			name,
			value,
		});
	}
	override toJSON() {
		super.validate({
			description: this.options.description,
			name: this.options.name,
		});
		return super.toJSON(this.options);
	}
}
