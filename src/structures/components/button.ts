import {
  APIButtonComponent,
  APIButtonComponentWithCustomId,
  APIMessageComponentEmoji,
  APIButtonComponentWithURL,
  ButtonStyle,
} from "../../types/mod.ts";
import { BaseComponent } from "./base.ts";
export class Button extends BaseComponent {
  private button: APIButtonComponent = { type: 2 } as APIButtonComponent;
  constructor() {
    super();
  }
  setLabel(text: string) {
    this.button.label = text;
    return this;
  }
  setStyle(style: keyof typeof ButtonStyle) {
    this.button.style = ButtonStyle[style];
    return this;
  }
  setDisabled(disabled: boolean) {
    this.button.disabled = disabled;
    return this;
  }
  setEmoji(emoji: APIMessageComponentEmoji) {
    this.button.emoji = emoji;
    return this;
  }
  setCustomId(id: string) {
    (this.button as APIButtonComponentWithCustomId).custom_id = id;
    return this;
  }
  setUrl(url: string) {
    if (!url.startsWith("http://") || !url.startsWith("https://")) {
      (this.button as APIButtonComponentWithURL).url = url
    }
  }
  toJSON() {
    return this.button;
  }
}
