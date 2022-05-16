import { APITextInputComponent, TextInputStyle } from "../../types/mod.ts";

export class TextInputComponent {
	components: APITextInputComponent = { type: 4 } as APITextInputComponent;
	setCustomId(customId: string) {
		this.components.custom_id = customId;
		return this;
	}
	setLabel(label: string) {
		this.components.label = label;
		return this;
	}
	setStyle(style: keyof typeof TextInputStyle) {
		this.components.style = TextInputStyle[style];
		return this;
	}
	setMinLength(minLength: number) {
		if (minLength == 0) {
			throw new Error("minLength must be greater than 0");
		}
		this.components.min_length = minLength;
		return this;
	}
	setMaxLength(maxLength: number) {
		if (maxLength == 0) {
			throw new Error("maxLength must be greater than 0");
		}
		if (maxLength > 4000) {
			throw new Error("maxLength must be less than 4000");
		}
		this.components.max_length = maxLength;
		return this;
	}
	setPlaceholder(placeholder: string) {
		this.components.placeholder = placeholder;
		return this;
	}
	setRequired(required: boolean) {
		this.components.required = required;
		return this;
	}
	toJSON() {
		return {
			...this.components,
		};
	}
}
