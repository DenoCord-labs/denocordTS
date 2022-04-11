import { MessageActionRow, Components } from "../types/ActionRow.ts";
import { SelectMenu } from "./SelectMenu.ts";
export class ActionRow {
  actionRow: MessageActionRow = {
    type: 1,
    components: [],
  };
  constructor() {}
  addComponents(...components: Components[]) {
    this.allSameType(...components);
    if (components[0] instanceof SelectMenu && components.length > 1) {
      throw new Error("You can only add one SelectMenu to an ActionRow");
    }
    if (components.length > 5) {
      throw new Error("You can only add 5 components to an ActionRow");
    }
    this.actionRow.components = this.actionRow.components.concat(components);
    return this;
  }
  create() {
    return this.actionRow;
  }
  protected allSameType(...components: Components[]) {
    const types = components.map((c) => c.type);
    const uniqueTypes = [...new Set(types)];
    if (uniqueTypes.length > 1) {
      throw new Error(
        "All components must be of the same type in an ActionRow"
      );
    }
  }
}
