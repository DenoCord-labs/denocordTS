import { Interaction } from "./Interaction.ts";
import { Payload } from "./ButtonInteraction.ts";

export class SelectMenuInteraction extends Interaction {
  // deno-lint-ignore no-explicit-any
  constructor(protected d: any) {
    super(d);
  }
  generate() {
    const payload = this.create();
    const obj: Payload & {
      data: { custom_id: string; values: string[]; component_type: number }[];
    } = {
      ...payload,
    };
    return obj;
  }
}
