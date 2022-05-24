import { BaseChannel } from "./base.ts";
import { Base } from "../../client/base.ts";
export class ThreadChannel extends BaseChannel {
  constructor(d: any, client: Base) {
    super(d, client);
  }
}
