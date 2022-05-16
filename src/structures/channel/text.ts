import { APIInvite, Snowflake } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
import { request } from "../../rest/request.ts";
import { BaseChannel } from "./base.ts";
import { Camelize, camelize } from "../../../deps.ts";

enum ThreadTypes {
	PublicThread = 11,
	PrivateThread,
}

export class TextChannel extends BaseChannel {
	clientInstance: Base;
	constructor(d: any, client: Base) {
		super(d, client);
		this.clientInstance = client;
	}
	async createInvite({
		maxAge,
		maxUses,
		temporary,
		unique,
	}: {
		maxAge?: number;
		maxUses?: number;
		temporary?: boolean;
		unique?: boolean;
	}) {
		const body: Record<
			string,
			number | string | boolean | null | undefined
		> = {};
		body["max_age"] = maxAge;
		body["max_uses"] = maxUses;
		body["temporary"] = temporary;
		body["unique"] = unique;

		const res = await request(
			`/channels/${this.id}/invites`,
			"POST",
			this.clientInstance.token,
			body,
		);
		return camelize(await res.json()) as Camelize<APIInvite>;
	}
	async createThread({
		name,
		type,
		autoArchiveDuration,
		slowMode,
	}: {
		/**
		 * 1-100 Character Channel Name
		 */
		name: string;
		/**
		 * Duration in minutes to archive the thread automatically
		 * Available Values: `60` | `1440` | `10080` | `43200`
		 */
		autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
		/**
		 * Type of thread to create
		 */
		type: keyof typeof ThreadTypes;
		/**
		 * amount of seconds a user has to wait before sending another message (0-21600)
		 */
		slowMode?: number;
	}) {
		const body: Record<
			string,
			string | number | boolean | null | undefined
		> = {};
		body["name"] = name;
		body["type"] = type;
		body["auto_archive_duration"] = autoArchiveDuration;
		body["rate_limit_per_user"] = slowMode;
		const res = await request(
			`/channels/${this.id}/messages`,
			"POST",
			this.clientInstance.token,
			body,
		);
	}
	async createThreadFromMessage({
		messageId,
		name,
		autoArchiveDuration,
		slowMode,
	}: {
		messageId: Snowflake;
		name: string;
		autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
		slowMode?: number;
	}) {
		const body: Record<
			string,
			string | number | boolean | null | undefined
		> = {};
		body["name"] = name;
		body["auto_archive_duration"] = autoArchiveDuration;
		body["rate_limit_per_user"] = slowMode;
		const res = await request(
			`/channels/${this.id}/messages/${messageId}/thread`,
			"POST",
			this.clientInstance.token,
			body,
		);
	}
}
