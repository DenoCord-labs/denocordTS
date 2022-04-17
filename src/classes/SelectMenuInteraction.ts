// deno-lint-ignore-file no-explicit-any
import { Interaction } from "./Interaction.ts";
export class SelectMenuInteraction extends Interaction {
  constructor(protected d: any) {
    super(d);
  }
  generate(): any {
    const payload = this.create();
    const obj = {
      ...payload,
      data: payload.data as any,
    };
    return obj;
  }
}
