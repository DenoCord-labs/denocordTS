import { APIGuildMember, PermissionFlagsBits } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
export class GuildMember implements APIGuildMember {
	avatar: APIGuildMember["avatar"];
	communication_disabled_until?: APIGuildMember["communication_disabled_until"];
	deaf: APIGuildMember["deaf"];
	joined_at: APIGuildMember["joined_at"];
	mute: APIGuildMember["mute"];
	nick?: APIGuildMember["nick"];
	pending: APIGuildMember["pending"];
	premium_since?: APIGuildMember["premium_since"];
	roles: APIGuildMember["roles"];
	user: APIGuildMember["user"];
	permission: BigInt;
	hasPermission: (permission: keyof typeof PermissionFlagsBits) => boolean;
	constructor(d: any, client: Base, public guildOwner?: boolean) {
		this.avatar = d.avatar;
		this.communication_disabled_until = d.communication_disabled_until;
		this.deaf = d.deaf;
		this.joined_at = d.joined_at;
		this.mute = d.mute;
		this.nick = d.nick;
		this.pending = d.pending;
		this.premium_since = d.premium_since;
		this.roles = d.roles;
		this.permission = BigInt(0);
		this.roles.map((role) => {
			const cachedRole = client.cache.roles.get(role);
			if (cachedRole) {
				this.permission =
					// @ts-ignore
					this.permission | BigInt(cachedRole.permissions);
			}
		});
		this.hasPermission = (permission: keyof typeof PermissionFlagsBits) => {
			if (this.guildOwner) return true;
			return Boolean(
				// @ts-ignore
				this.permission &
					// @ts-ignore
					(BigInt(PermissionFlagsBits[permission]) ===
						BigInt(PermissionFlagsBits[permission]))
			);
		};
	}
}
