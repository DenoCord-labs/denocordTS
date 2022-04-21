import { BaseMessage } from "./Base.ts";
import { APIMessage } from "../../../deps.ts";
export class Message extends BaseMessage {
	constructor(d: APIMessage, token: string) {
		super(d, token);
	}
}
