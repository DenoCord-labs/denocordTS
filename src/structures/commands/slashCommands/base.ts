import { CommandType } from "../../../types/commands/mod.ts";
import {
  AttachmentOptions,
  BooleanOption,
  ChannelOptions,
  IntegerOption,
  MentionableOptions,
  NumberOptions,
  RoleOption,
  StringOption,
  UserOption,
} from "./options/mod.ts";
export class BaseApplicationCommand {
  name = "";
  name_localizations = undefined;
  description = "";
  description_localizations = undefined;
  options: any[] = [];
  type = CommandType.ChatInput;
  dm_permission: undefined | boolean = undefined;
  constructor() {}
  setName(name: string) {
    this.name = name;
    return this;
  }
  setDescription(description: string) {
    if (description.length > 100) {
      throw new Error("Description must be less than 100 characters");
    }
    this.description = description;
    return this;
  }

  disableInDm() {
    this.dm_permission = false;
    return this;
  }
  addStringOption(callback: (e: StringOption) => StringOption): this {
    this.options.push(callback(new StringOption()).toJSON());
    return this;
  }
  addIntegerOption(callback: (e: IntegerOption) => IntegerOption): this {
    this.options.push(callback(new IntegerOption()).toJSON());
    return this;
  }
  addBooleanOption(callback: (e: BooleanOption) => BooleanOption): this {
    this.options.push(callback(new BooleanOption()).toJSON());
    return this;
  }
  addUserOption(callback: (e: UserOption) => UserOption): this {
    this.options.push(callback(new UserOption()).toJSON());
    return this;
  }
  addRoleOption(callback: (e: RoleOption) => RoleOption): this {
    this.options.push(callback(new RoleOption()).toJSON());
    return this;
  }
  addMentionableOption(
    callback: (e: MentionableOptions) => MentionableOptions,
  ): this {
    this.options.push(callback(new MentionableOptions()).toJSON());
    return this;
  }
  addNumberOption(callback: (e: NumberOptions) => NumberOptions): this {
    this.options.push(callback(new NumberOptions()).toJSON());
    return this;
  }
  addAttachmentOption(
    callback: (e: AttachmentOptions) => AttachmentOptions,
  ): this {
    this.options.push(callback(new AttachmentOptions()).toJSON());
    return this;
  }
  addChannelOption(callback: (e: ChannelOptions) => ChannelOptions): this {
    this.options.push(callback(new ChannelOptions()).toJSON());
    return this;
  }
  toJSON(): any {
    this.options.sort((a, b) => {
      if (a.required && !b.required) return -1;
      if (!a.required && b.required) return 1;
      return 0;
    }); // move required options to the top
    return {
      name: this.name,
      name_localizations: this.name_localizations,
      description: this.description,
      description_localizations: this.description_localizations,
      options: this.options.length > 0 ? this.options : [],
      dm_permission: this.dm_permission,
    };
  }
}
