import { Base } from "./base.ts";
import { ClientOptions } from "../types/mod.ts";
import {
	APIInteractionGuildMember,
	GatewayOpcodes,
	GatewayPresenceUpdateData,
} from "../types/mod.ts";
import type { SlashCommand } from "../structures/commands/slashCommands/builder.ts";
import { PermissionBits } from "../types/permission.ts";
import { CDN } from "../rest/cdn.ts";
import { discordFetch as request } from "../rest/mod.ts";
export class Client extends Base {
	public cdn = new CDN();
	constructor(protected options: ClientOptions) {
		super(options);
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
}
