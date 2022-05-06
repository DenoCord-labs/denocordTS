import {
  ApplicationCommandOptionType,
  APIApplicationCommandBooleanOption,
} from "../../../../types/mod.ts";
import { BaseCommandOption } from "./base.ts";
export class BooleanOption extends BaseCommandOption {
  option: APIApplicationCommandBooleanOption = {
    type: ApplicationCommandOptionType.Boolean,
    description_localizations: undefined,
    name_localizations: undefined,
    required: false,
  } as APIApplicationCommandBooleanOption;
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
  setDescription(desc: string) {
    this.option.description = desc;
    return this;
  }
  override toJSON() {
    super.validate({
      description: this.option.description,
      name: this.option.name,
    });
    return super.toJSON(this.option);
  }
}
