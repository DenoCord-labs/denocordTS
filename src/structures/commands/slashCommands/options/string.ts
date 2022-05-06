import {
  APIApplicationCommandStringOption,
  ApplicationCommandOptionType,
  APIApplicationCommandOptionChoice,
} from "../../../../types/mod.ts";
import { BaseCommandOption } from "./base.ts";
export class StringOption extends BaseCommandOption {
  choices: APIApplicationCommandOptionChoice<string>[] = [];
  option: APIApplicationCommandStringOption = {
    type: ApplicationCommandOptionType.String,
    description_localizations: undefined,
    name_localizations: undefined,
    choices: this.choices,
  } as APIApplicationCommandStringOption;
  constructor() {
    super();
  }
  setRequired(required: boolean) {
    this.option.required = required;
    return this;
  }
  setName(name: string) {
    this.option.name = name;
    return this;
  }
  setDescription(description: string) {
    this.option.description = description;
    return this;
  }
  setAutoComplete(autocomplete: boolean) {
    this.option.autocomplete = autocomplete;
    return this;
  }
  addChoice({ name, value }: { name: string; value: string }) {
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
