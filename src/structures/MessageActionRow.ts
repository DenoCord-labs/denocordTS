import { MessageActionRow } from "../types/ActionRow.ts";
import { Button } from "../types/Button.ts";
export class ActionRow {
  actionRow: MessageActionRow = {
    type: 1,
    components: [],
  };
  constructor() {}
  addComponents(...buttons: Button[]) {
    if (buttons.length > 5) {
      throw new Error("You can only add 5 components to an ActionRow");
    }
    this.actionRow.components = this.actionRow.components.concat(buttons);
    return this;
  }
  get() {
    return this.actionRow;
  }
}
