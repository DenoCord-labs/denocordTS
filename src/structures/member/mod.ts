import { APIGuildMember, PermissionFlagsBits } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
import { request } from "../../rest/mod.ts";

export class GuildMember implements APIGuildMember {
	avatar: APIGuildMember["avatar"];
	communication_disabled_until?:
		APIGuildMember["communication_disabled_until"];
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
	constructor(
		private d: any,
		private client: Base,
		public guildOwner?: boolean,
	) {
		this.avatar = d.member.avatar;
		this.communication_disabled_until =
			d.member.communication_disabled_until;
		this.deaf = d.member.deaf;
		this.joined_at = d.member.joined_at;
		this.mute = d.member.mute;
		this.nick = d.member.nick;
		this.pending = d.member.pending;
		this.premium_since = d.member.premium_since;
		this.roles = d.member.roles;
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
						BigInt(PermissionFlagsBits[permission])),
			);
		};
	}
	async kick(reason?: string) {
		let headers: undefined | HeadersInit;
		if (reason) {
			headers = new Headers();
			headers.append("X-Audit-Log-Reason", reason);
		}
		await request(
			`/guilds/${this.d.guild_id!}/members/${this.user?.id}`,
			"DELETE",
			this.client.token,
			undefined,
			headers,
		);
	}
	async ban(reason?: string) {
		let headers: undefined | HeadersInit;
		if (reason) {
			headers = new Headers();
			headers.append("X-Audit-Log-Reason", reason);
		}
		await request(
			`/guilds/${this.d.guild_id!}/bans/${this.user?.id}`,
			"PUT",
			this.client.token,
			undefined,
			headers,
		);
	}
}
