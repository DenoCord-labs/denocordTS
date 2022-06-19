import {
  APIRole,
  APIRoleTags,
  PermissionFlagsBits,
  Snowflake,
} from "../../types/mod.ts";
import { ColorResolvable, resolveColor } from "../../utils/mod.ts";
import { Guild } from "../mod.ts";
import { Base } from "../../client/base.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";
import { DiscordSnowflake } from "../../../deps.ts";

export class Role {
  id: Snowflake;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string | null;
  unicodeEmoji?: string | null;
  position: number;
  permissions: string;
  managed: boolean;
  tags?: APIRoleTags;
  createdAt: number;
  mentionable: boolean;
  constructor(d: APIRole, protected guild: Guild, protected client: Base) {
    this.id = d.id;
    this.name = d.name;
    this.color = d.color;
    this.hoist = d.hoist;
    this.icon = d.icon;
    this.unicodeEmoji = d.unicode_emoji;
    this.position = d.position;
    this.permissions = d.permissions;
    this.managed = d.managed;
    this.tags = d.tags;
    this.createdAt = DiscordSnowflake.timestampFrom(d.id);
    this.mentionable = d.mentionable;
  }
  async setName(name: string, reason?: string) {
    await this.guild.modifyRole({
      name,
      reason,
      roleId: this.id,
    });
    this.name = name;
    return undefined;
  }
  async setColor(color: ColorResolvable, reason?: string) {
    await this.guild.modifyRole({
      color: resolveColor(color),
      reason,
      roleId: this.id,
      name: this.name,
    });
    this.color = resolveColor(color) as number;
    return undefined;
  }
  async setPermissions(
    permissions: (keyof typeof PermissionFlagsBits)[],
    reason?: string,
  ) {
    await this.guild.modifyRole({
      permission: permissions,
      reason,
      roleId: this.id,
      name: this.name,
    });
    this.permissions = String(
      permissions
        .map((p) => PermissionFlagsBits[p])
        .reduce((a, b) => a | b),
    );
    return undefined;
  }
  async setPosition(position: number, reason?: string) {
    const headers = new Headers()
    if (reason) {
      headers.append("X-Audit-Log-Reason", reason)
    }
    await this.client.rest.request(
      endpoints.modifyGuildRolePositions(this.guild.id),
      "PATCH",
      {
        id: this.id,
        position,
      }, headers
    );
    this.position = position;
    return undefined;
  }
  async setHoist(hoist: boolean, reason?: string) {
    await this.guild.modifyRole({
      displaySeparatelyInSidebar: hoist,
      reason,
      roleId: this.id,
      name: this.name,
    });
    this.hoist = hoist;
    return undefined;
  }
  async setMentionable(mentionable: boolean, reason?: string) {
    await this.guild.modifyRole({
      mentionable,
      reason,
      roleId: this.id,
      name: this.name,
    });
    this.mentionable = mentionable;
    return undefined;
  }
  async setUnicodeEmoji(unicodeEmoji: string, reason?: string) {
    await this.guild.modifyRole({
      reason,
      roleId: this.id,
      name: this.name,
    });
    this.unicodeEmoji = unicodeEmoji;
    return undefined;
  }
}
