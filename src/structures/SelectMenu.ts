import {
  SelectMenu as SelectMenuType,
  SelectMenuOption
} from "../types/SelectMenu.ts";
export class SelectMenu {
  menu: SelectMenuType = { type: 3, options: [] } as SelectMenuType;
  constructor() {}
  setCustomId(id: string) {
    this.menu.custom_id = id;
    return this;
  }
  setPlaceHolder(message: string) {
    this.menu.placeholder = message;
    return this;
  }
  setDisabled(disabled: boolean) {
    this.menu.disabled = disabled;
    return this;
  }
  setMaxValues(max: number) {
    this.menu.max_values = max;
    return this;
  }
  setMinValues(min: number) {
    this.menu.min_values = min;
    return this;
  }
  addOption(option: SelectMenuOption) {
    this.menu.options.push(option);
    return this;
  }
  addOptions(options: SelectMenuOption[]) {
    if (this.menu.options) {
      this.menu.options.push(...options);
    } else {
      this.menu.options = options;
    }
    return this;
  }
  create() {
    if (this.menu.options.length > 25) {
      throw new Error(
        "You can only create a SelectMenu with 25 or more options"
      );
    }
    if (this.menu.options.length == 0) {
      throw new Error(
        "You can only create a SelectMenu with at least one option"
      );
    }
    return this.menu;
  }
}
