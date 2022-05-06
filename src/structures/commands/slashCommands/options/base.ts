export class BaseCommandOption {
	constructor() {}
	toJSON(obj: Record<any, any>) {
		return obj;
	}
	validate({
		name,
		description,
		autocomplete,
		choices,
	}: {
		name: string;
		description: string;
		autocomplete?: boolean;
		choices?: Array<any>;
	}) {
		if (
			!new RegExp(/^[-_\p{L}\p{N}\p{sc=Devanagari}\p{sc=Thai}]{1,32}$/u)
				.test(
					name,
				)
		) {
			throw new Error(
				"Name must be between 1 and 32 characters and can only contain letters, numbers, underscores, and dashes.",
			);
		}
		if (description.length > 100) {
			throw new Error("Description must be less than 100 characters");
		}
		if (autocomplete && choices) {
			throw new Error("Autocomplete and choices are mutually exclusive");
		}
	}
}
