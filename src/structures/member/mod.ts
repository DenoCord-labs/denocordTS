import { APIGuildMember, PermissionFlagsBits } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
import { RestClient } from "../../http/rest.ts";
import { DiscordSnowflake } from "../../../deps.ts";
import { User } from "../mod.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";
export class GuildMember {
  private rest = new RestClient();
  avatar: APIGuildMember["avatar"];
  communicationDisabledUntil?: APIGuildMember["communication_disabled_until"];
  deaf: APIGuildMember["deaf"];
  joinedAt: APIGuildMember["joined_at"];
  mute: APIGuildMember["mute"];
  nick?: APIGuildMember["nick"];
  pending: APIGuildMember["pending"];
  premiumSince?: APIGuildMember["premium_since"];
  roles: APIGuildMember["roles"];
  user?: User;
  permission: bigint;
  constructor(
    private d: any,
    private client: Base,
    public guildOwner?: boolean,
  ) {
    this.avatar = d.member.avatar;
    this.communicationDisabledUntil = d.member.communication_disabled_until;
    this.deaf = d.member.deaf;
    this.joinedAt = d.member.joined_at;
    this.mute = d.member.mute;
    this.nick = d.member.nick;
    this.pending = d.member.pending;
    this.premiumSince = d.member.premium_since;
    this.roles = d.member.roles;
    this.user = d.user ? new User(d.user, this.client) : undefined;
    this.permission = BigInt(0);
    this.roles.map((role) => {
      const cachedRole = client.cache.roles.get(role);
      if (cachedRole) {
        this.permission = this.permission |
          BigInt(cachedRole.permissions);
      }
    });
  }
  async kick(reason?: string) {
    let headers: undefined | HeadersInit;
    if (reason) {
      headers = new Headers();
      headers.append("X-Audit-Log-Reason", reason);
    }
    await this.rest.request(
      endpoints.removeGuildBan(this.d.guild_id!, this.user?.id!),
      "DELETE",
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
    await this.rest.request(
      endpoints.createGuildBan(this.d.guild_id!, this.user?.id!),
      "PUT",
      undefined,
      headers,
    );
  }

  hasPermission(permission: keyof typeof PermissionFlagsBits) {
    if (this.guildOwner) return true;
    return (
      (this.permission & PermissionFlagsBits[permission]) ===
        PermissionFlagsBits[permission]
    );
  }
  async updateNickname(nickname: string, reason?: string) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await this.rest.request(
      endpoints.modifyGuildMember(this.d.guild_id!, this.user?.id!),
      "PATCH",
      { nick: nickname },
      headers,
    );
  }
  async addRole(roleId: string, reason?: string) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await this.rest.request(
      endpoints.addGuildMemberRole(
        this.d.guild_id!,
        this.user?.id!,
        roleId,
      ),
      "PUT",
      undefined,
      headers,
    );
  }
  async removeRole(roleId: string, reason?: string) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await this.rest.request(
      endpoints.removeGuildMemberRole(
        this.d.guild_id!,
        this.user?.id!,
        roleId,
      ),
      "DELETE",
      undefined,
      headers,
    );
  }
  async moveToAnotherVoiceChannel(channelId: string, reason?: string) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await this.rest.request(
      endpoints.modifyGuildMember(this.d.guild_id!, this.user?.id!),
      "PATCH",
      { channel_id: channelId },
      headers,
    );
  }
  async addTimeout(duration: string, reason?: string) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await this.rest.request(
      endpoints.modifyGuildMember(this.d.guild_id!, this.user?.id!),
      "PATCH",
      { communication_disabled_until: duration },
      headers,
    );
  }
  async removeTimeout(reason?: string) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    await this.rest.request(
      endpoints.modifyGuildMember(this.d.guild_id!, this.user?.id!),
      "PATCH",
      { communication_disabled_until: null },
      headers,
    );
  }
}
