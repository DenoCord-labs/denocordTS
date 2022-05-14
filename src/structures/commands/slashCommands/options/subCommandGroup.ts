import { SubCommand } from "./subCommand.ts";
import { BaseApplicationCommand } from "../base.ts";
import {
  APIApplicationCommandSubcommandGroupOption,
  APIApplicationCommandSubcommandOption,
  ApplicationCommandOptionType,
} from "../../../../types/mod.ts";
export class SubCommandGroup {
  private options: APIApplicationCommandSubcommandOption[] = [];
  private option = {
    type: ApplicationCommandOptionType.SubcommandGroup,
    description_localizations: undefined,
    name_localizations: undefined,
    options: this.options,
  } as APIApplicationCommandSubcommandGroupOption;
  constructor() {}
  setName(name: string) {
    this.option.name = name;
    return this;
  }
  setRequired(required: boolean) {
    this.option.required = required;
    return this;
  }
  setDescription(description: string) {
    this.option.description = description;
    return this;
  }

  addSubCommand(callback: (e: SubCommand) => SubCommand): this {
    this.options.push({
      ...callback(new SubCommand()).toJSON(),
      type: ApplicationCommandOptionType.Subcommand,
    });
    return this;
  }
  ToJSON() {
    if (this.options.length > 25) {
      throw new Error("SubCommandGroup can only have 25 subcommands");
    }
    if (this.options.length === 0) {
      throw new Error("SubCommandGroup must have atleast one subcommand");
    }
    return this.option;
  }
}
