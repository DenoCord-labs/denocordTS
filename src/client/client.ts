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
import {
	registerGuildSlashCommands,
	registerGlobalSlashCommands,
} from "../http/endpoints.ts";
declare global {
	const token: string | undefined;
	interface Window {
		token: string | undefined;
	}
}

export class Client extends Base {
	public cdn = CDN;
	displayAvatarUrl;
	constructor(protected options: ClientOptions) {
		super(options);
		this.displayAvatarUrl =
			super.user && super.user.avatar
				? this.cdn.getUserAvatar
				: this.cdn.getDefaultUserAvatar;
		window.token = this.options.token;
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
	async registerGlobalSlashCommands(commands: SlashCommand[]) {
		await registerGlobalSlashCommands(commands, this.options.clientId);
	}
	async registerGuildSlashCommands({
		commands,
		guildId,
	}: {
		guildId: string;
		commands: SlashCommand[];
	}) {
		await registerGuildSlashCommands(
			commands,
			this.options.clientId,
			guildId
		);
	}
}
