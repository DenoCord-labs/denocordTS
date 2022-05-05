import { BaseMessage } from "./Base.ts";
import { APIMessage } from "../../types/mod.ts";
export class Message extends BaseMessage {
	constructor(d: APIMessage, token: string) {
		super(d, token);
	}
}
