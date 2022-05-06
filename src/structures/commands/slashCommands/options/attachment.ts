import {
	APIApplicationCommandAttachmentOption,
	ApplicationCommandOptionType,
} from "../../../../types/mod.ts";
import { BaseCommandOption } from "./base.ts";

export class AttachmentOptions extends BaseCommandOption {
	options: APIApplicationCommandAttachmentOption = {
		type: ApplicationCommandOptionType.Attachment,
		description_localizations: undefined,
		name_localizations: undefined,
		required: false,
	} as APIApplicationCommandAttachmentOption;
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
