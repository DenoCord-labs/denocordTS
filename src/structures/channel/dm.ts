import { BaseChannel } from "./base.ts";
import { Base } from "../../client/base.ts";

export class DmChannel extends BaseChannel {
	constructor(data: any, client: Base) {
		super(data, client);
	}
}
