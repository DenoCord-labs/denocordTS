import { TextInputComponent } from "./textInput.ts";

export class Modal {
  title: string = "";
  custom_id: string = "";
  components: any[] = [];
  constructor() {}
  setTitle(title: string) {
    this.title = title;
    return this;
  }
  setCustomId(customId: string) {
    this.custom_id = customId;
    return this;
  }
  addComponents(...components: TextInputComponent[]) {
    this.components.push({
      type: 1,
      components: [...components.map((cmd) => cmd.toJSON())],
    });

    return this;
  }
  toJSON() {
    return {
      title: this.title,
      custom_id: this.custom_id,
      components: this.components,
    };
  }
}
