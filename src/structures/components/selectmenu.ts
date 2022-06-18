import {
  APISelectMenuComponent,
  APISelectMenuOption,
} from "../../types/mod.ts";
import { BaseComponent } from "./base.ts";
import { parseEmojiForComponents } from "../../utils/mod.ts"

type SelectMenuOptions = Omit<APISelectMenuOption, "emoji"> & {
  emoji: string;
}

export class SelectMenu extends BaseComponent {
  private selectMenu: APISelectMenuComponent = {
    type: 3,
  } as APISelectMenuComponent;
  constructor() {
    super();
  }
  setCustomId(id: string) {
    this.selectMenu.custom_id = id;
    return this;
  }
  setPlaceholder(text: string) {
    this.selectMenu.placeholder = text;
    return this;
  }
  setMinValues(min: number) {
    this.selectMenu.min_values = min;
    return this;
  }
  setMaxValues(max: number) {
    this.selectMenu.max_values = max;
    return this;
  }
  setOptions(...options: SelectMenuOptions[]) {
    if (this.selectMenu.options) {
      this.selectMenu.options.push(...options.map(option => ({ ...option, emoji: parseEmojiForComponents(option.emoji) as APISelectMenuOption["emoji"] })));
    } else {
      this.selectMenu.options = options.map(option => ({ ...option, emoji: parseEmojiForComponents(option.emoji) as APISelectMenuOption["emoji"] }));
    }
    return this;
  }
  toJSON() {
    return this.selectMenu;
  }
}
