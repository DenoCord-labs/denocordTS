import { SubCommand, SubCommandGroup } from "./options/mod.ts";
import { BaseApplicationCommand } from "./base.ts";
import { ApplicationCommandOptionType } from "../../../types/mod.ts";
export class SlashCommand extends BaseApplicationCommand {
	constructor() {
		super();
	}
	addSubCommand(callback: (e: SubCommand) => SubCommand): this {
		this.options.push({
			...callback(new SubCommand()).toJSON(),
			type: ApplicationCommandOptionType.Subcommand,
		});
		return this;
	}
	addSubCommandGroup(
		callback: (e: SubCommandGroup) => SubCommandGroup,
	): this {
		this.options.push({
			...callback(new SubCommandGroup()).ToJSON(),
			type: ApplicationCommandOptionType.SubcommandGroup,
			options: callback(new SubCommandGroup()).ToJSON().options,
		});
		return this;
	}
}
