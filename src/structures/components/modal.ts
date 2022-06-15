import { TextInputComponent } from "./textInput.ts";
import { ActionRow, Button } from "../mod.ts"


export class Modal {
  title = "";
  custom_id = "";
  components: any[] = [];
  constructor() { }
  setTitle(title: string) {
    this.title = title;
    return this;
  }
  setCustomId(customId: string) {
    this.custom_id = customId;
    return this;
  }
  addComponents(...components: TextInputComponent[]) {
    if (components.length > 5) throw new Error("You can only add 5 Text Input in a Modal.")
    components.map(component => {
      const row = new ActionRow().addComponents(component as unknown as Button)
      this.components.push(row)
    })
    return this;
  }
  toJSON() {
    if (!this.title) throw new Error("Modal must contain a title")
    if (!this.custom_id) throw new Error("Modal must contain a Custom Id")
    if (this.components.length === 0) throw new Error("Please Add Atleast one Text Input Component in Modal.")
    return {
      title: this.title,
      custom_id: this.custom_id,
      components: this.components,
    };
  }
}
