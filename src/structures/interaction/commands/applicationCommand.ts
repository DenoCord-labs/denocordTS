import { Interaction } from "../interaction.ts";
import {
	APIInteraction,
	InteractionResponseType,
	APICommandAutocompleteInteractionResponseCallbackData,
} from "../../../types/mod.ts";
import { camelize } from "../../../../deps.ts";
import { discordFetch as request } from "../../../rest/request.ts";
export class ApplicationCommandInteraction extends Interaction {
	id = "";
	applicationId: APIInteraction["application_id"] = "";
	type = 2;
	data?: APIInteraction["data"] = {} as APIInteraction["data"];
	guildId?: APIInteraction["guild_id"] = "";
	channelId?: APIInteraction["channel_id"] = "";
	member?: APIInteraction["member"];
	user?: APIInteraction["user"];
	version = 1;
	message?: APIInteraction["message"];
	locale?: string;
	guildLocale?: string;
	constructor(
		protected interaction: APIInteraction & { locale: string },
		protected token: string
	) {
		super(interaction, token);
		for (const key in this.interaction) {
			// @ts-ignore
			this[camelize(key)] = this.interaction[key];
		}
	}
	async populateAutoCompleteChoices(
		choices: APICommandAutocompleteInteractionResponseCallbackData["choices"][]
	) {
		if (!this.isAutoComplete) {
			throw new Error("This is not an autocomplete interaction");
		}
		await request(
			`/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
			"POST",
			this.token,
			{
				type: InteractionResponseType.ApplicationCommandAutocompleteResult,
				choices,
			}
		);
	}
}
