import { Camelize } from "../../deps.ts";
import { GatewayInteractionCreateDispatchData } from "./mod.ts";
import type { ApplicationCommandInteraction } from "../structures/interaction/commands/applicationCommand.ts";
export type CommandInteraction =
	& Camelize<GatewayInteractionCreateDispatchData>
	& {
		reply: ApplicationCommandInteraction["reply"];
		deferReply: ApplicationCommandInteraction["deferReply"];
		editReply: ApplicationCommandInteraction["editReply"];
		deleteReply: ApplicationCommandInteraction["deleteReply"];
		editFollowUp: ApplicationCommandInteraction["editFollowUp"];
		deleteFollowUp: ApplicationCommandInteraction["deleteFollowUp"];
		followUp: ApplicationCommandInteraction["followUp"];
		fetchFollowUp: ApplicationCommandInteraction["fetchFollowUp"];
		isCommand: boolean;
		isComponentInteraction: boolean;
		isAutoComplete: boolean;
		isModalSubmit: boolean;
		populateAutoCompleteChoices:
			ApplicationCommandInteraction["populateAutoCompleteChoices"];
		showModal: ApplicationCommandInteraction["showModal"];
		closeModal: ApplicationCommandInteraction["closeModal"];
	};
