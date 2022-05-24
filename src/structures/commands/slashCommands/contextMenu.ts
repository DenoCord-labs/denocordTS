import { CommandType } from "../../../types/commands/mod.ts";
import { LocaleString, LocalizationMap } from "../../../types/mod.ts";

export class ContextMenu {
  name = "";
  name_localizations: undefined | LocalizationMap = undefined;
  description = "";
  description_localizations: undefined | LocalizationMap = undefined;
  type = CommandType.Message;
  dm_permission: undefined | boolean = undefined;
  constructor() {}
  setName(name: string) {
    this.name = name;
    return this;
  }
  disableInDm() {
    this.dm_permission = false;
    return this;
  }
  setNameLocale(locale: LocaleString, localizedString: string | null): this {
    if (!this.name_localizations) {
      Reflect.set(this, "name_localizations", {});
    }
    if (localizedString === null) {
      this.name_localizations![locale] = null;
      return this;
    }
    this.name_localizations![locale] = localizedString;
    return this;
  }
  setDescriptionLocale(
    locale: LocaleString,
    localizedString: string | null,
  ): this {
    if (!this.description_localizations) {
      Reflect.set(this, "description_localizations", {});
    }
    if (localizedString === null) {
      this.description_localizations![locale] = null;
      return this;
    }
    this.description_localizations![locale] = localizedString;
    return this;
  }
  setType(type: "Message" | "User") {
    if (type === "Message") this.type = CommandType.Message;
    if (type === "User") this.type = CommandType.User;
    return this;
  }
  toJSON() {
    return {
      name: this.name,
      name_localizations: this.name_localizations,
      description: this.description,
      description_localizations: this.description_localizations,
      type: this.type,
      dm_permission: this.dm_permission,
    };
  }
}
