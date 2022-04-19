import { Base } from "./base.ts";
import { ClientOptions } from "../types/mod.ts";
export class Client extends Base {
  constructor(protected options: ClientOptions) {
    super(options);
  }
}
