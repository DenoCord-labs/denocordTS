import {
  APIButtonComponent,
  APIButtonComponentWithCustomId,
  APIButtonComponentWithURL,
  APIMessageComponentEmoji,
  ButtonStyle,
} from "../../types/mod.ts";
import { BaseComponent } from "./base.ts";
import { parseEmojiForComponents } from "../../utils/mod.ts";
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
  setEmoji(emoji: string) {
    this.button.emoji = parseEmojiForComponents(
      emoji,
    ) as APIMessageComponentEmoji;
    return this;
  }
  setCustomId(id: string) {
    (this.button as APIButtonComponentWithCustomId).custom_id = id;
    return this;
  }
  setUrl(url: string) {
    if (!url.startsWith("http://") || !url.startsWith("https://")) {
      throw new Error(`Invalid URL Supplied to Button: ${url}`);
    }
    (this.button as APIButtonComponentWithURL).url = url;
  }
  toJSON() {
    return this.button;
  }
}
