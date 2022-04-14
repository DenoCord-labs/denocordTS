import { Button as ButtonType, ButtonStyle } from "../types/Button.ts";
import { ComponentType } from "../types/Component.ts";
export class Button {
  protected button: ButtonType = { type: ComponentType.BUTTON } as ButtonType;
  constructor() {}
  setLabel(text: string) {
    this.button.label = text;
    return this;
  }
  setStyle(style: keyof typeof ButtonStyle) {
    this.button.style = ButtonStyle[style];
    return this;
  }
  setUrl(url: string) {
    this.button.url = url;
    return this;
  }
  setDisabled(disabled: boolean) {
    this.button.disabled = disabled;
    return this;
  }
  setCustomId(id: string) {
    this.button.custom_id = id;
    return this;
  }
  create() {
    return this.button;
  }
}
