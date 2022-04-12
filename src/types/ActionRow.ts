import { Button } from "./Button.ts";
import { ComponentType } from "./Component.ts";
import { SelectMenu } from "./SelectMenu.ts";
export type Components = Button | SelectMenu;
export type MessageActionRow = {
  type: ComponentType.ACTION_ROW;
  components: Components[];
};
