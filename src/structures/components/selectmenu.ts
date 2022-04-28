import {
  APISelectMenuComponent,
  APISelectMenuOption,
} from "../../types/mod.ts";
import { BaseComponent } from "./base.ts";
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
  setOptions(options: APISelectMenuOption[]) {
    if (this.selectMenu.options) {
      this.selectMenu.options.push(...options);
    } else {
      this.selectMenu.options = options;
    }
    return this;
  }
  create() {
    return this.selectMenu;
  }
}
