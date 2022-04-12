import { Button } from "./Button.ts";
import { SelectMenu } from "./SelectMenu.ts";
export type Components = Button | SelectMenu;
export type MessageActionRow = {
  type: 1;
  components: Components[];
};
