import {
  APIApplicationCommandStringOption,
  ApplicationCommandOptionType,
  APIApplicationCommandOptionChoice,
  APIApplicationCommandIntegerOption,
} from "../../../../types/mod.ts";
import { BaseCommandOption } from "./base.ts";

export class IntegerOption extends BaseCommandOption {
  choices: APIApplicationCommandOptionChoice<number>[] = [];
  option: APIApplicationCommandIntegerOption = {
    type: ApplicationCommandOptionType.Integer,
    description_localizations: undefined,
    name_localizations: undefined,
    choices: this.choices,
  } as APIApplicationCommandIntegerOption;
  constructor() {
    super();
  }
  setName(name: string) {
    this.option.name = name;
    return this;
  }
  setDescription(description: string) {
    this.option.description = description;
    return this;
  }
  setRequired(required: boolean) {
    this.option.required = required;
    return this;
  }
  setAutoComplete(autocomplete: boolean) {
    this.option.autocomplete = autocomplete;
    return this;
  }
  addChoice({ name, value }: { name: string; value: number }) {
    this.choices.push({ name, value, name_localizations: undefined });
  }
  override toJSON() {
    super.validate({
      description: this.option.description,
      name: this.option.name,
      autocomplete: this.option.autocomplete,
      choices: this.choices,
    });
    return super.toJSON(this.option);
  }
}
