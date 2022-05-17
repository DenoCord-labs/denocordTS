import { Base } from "./base.ts";
import { ClientOptions } from "../types/mod.ts";
import {
	APIAuditLog,
	APIInteractionGuildMember,
	GatewayOpcodes,
	GatewayPresenceUpdateData,
} from "../types/mod.ts";
import type { SlashCommand } from "../structures/commands/slashCommands/builder.ts";
import { PermissionBits } from "../types/permission.ts";
import { CDN, FileTypes, ALLOWED_SIZES } from "../rest/cdn.ts";
import { request as request } from "../rest/mod.ts";
import { Camelize, camelize } from "../../deps.ts";
import { BaseCdnUrl } from "../constants/mod.ts";
export class Client extends Base {
	public cdn = CDN;
	displayAvatarUrl;
	constructor(protected options: ClientOptions) {
		super(options);
		this.displayAvatarUrl =
			super.user && super.user.avatar
				? this.cdn.getUserAvatar
				: this.cdn.getDefaultUserAvatar;
	}
	setPresence(presence: GatewayPresenceUpdateData) {
		this.websocket.send(
			JSON.stringify({
				op: GatewayOpcodes.PresenceUpdate,
				d: {
					...presence,
				},
			})
		);
	}
	checkMemberPermission({
		member,
		permission,
	}: {
		member: APIInteractionGuildMember;
		permission: keyof typeof PermissionBits;
	}) {
		return BigInt(member.permissions) & PermissionBits[permission]
			? true
			: false;
	}
	async fetchGuildMember({
		guildId,
		userId,
	}: {
		guildId: string;
		userId: string;
	}): Promise<APIInteractionGuildMember> {
		const res = await request(
			`/guilds/${guildId}/members/${userId}`,
			"GET",
			this.options.token
		);
		return await res.json();
	}
	async registerGlobalSlashCommands(commands: SlashCommand[]) {
		for (const command of commands) {
			await request(
				`/applications/${this.options.clientId}/commands`,
				"POST",
				this.options.token,
				{
					...command.toJSON(),
				}
			);
		}
	}
	async registerGuildSlashCommands({
		commands,
		guildId,
	}: {
		guildId: string;
		commands: SlashCommand[];
	}) {
		for (const command of commands) {
			await request(
				`/applications/${this.options.clientId}/guilds/${guildId}/commands`,
				"POST",
				this.options.token,
				{ ...command.toJSON() }
			);
		}
	}
	async fetchGuildAuditLog(guildId: string) {
		const r = await request(
			`/guilds/${guildId}/audit-logs`,
			"GET",
			this.options.token
		);
		return camelize(await r.json()) as Camelize<APIAuditLog>;
	}
}
