import { Button } from "./Button.ts";
import { SelectMenu } from "./SelectMenu.ts";
import { TextInput } from "./TextInput.ts";
export type Components = Button | SelectMenu | TextInput;
export type MessageActionRow = {
  type: 1;
  components: Components[];
};
