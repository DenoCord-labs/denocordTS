import { BaseMessage } from "./Base.ts";
import { APIMessage } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
export class Message extends BaseMessage {
	constructor(d: APIMessage, client: Base) {
		super(d, client);
	}
}
