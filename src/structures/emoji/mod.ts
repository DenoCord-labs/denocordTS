import { endpoints } from "../../constants/endpoints/mod.ts";
import { Base } from "../../client/base.ts";
import { User } from "../mod.ts";
import { APIEmoji } from "../../types/mod.ts";
const { modifyGuildEmoji } = endpoints;

export class GuildEmoji {
  id: string | null;
  name: string | null;
  roles?: string[];
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;

  constructor(private d: APIEmoji, private client: Base, private readonly guildId: string) {
    this.id = d.id;
    this.name = d.name;
    this.requireColons = d.require_colons;
    this.roles = d.roles;
    this.user = d.user ? new User(d.user, client) : undefined;
    this.managed = d.managed;
    this.animated = d.animated;
    this.available = d.available;
  }

  async edit(
    { name, reason, roles }: {
      reason?: string;
      name: string;
      roles?: string[];
    },
  ) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    const data = await this.client.rest.request(
      modifyGuildEmoji(this.guildId, this.id!),
      "PATCH",
      { name, roles: roles || [] },
      headers,
    );
    const res = await data.json();
    this.name = res.name;
    this.roles = res.roles;
    this.requireColons = res.require_colons;
    this.managed = res.managed;
    this.animated = res.animated;
    this.available = res.available;
    return this;
  }
  toRender() {
    if (this.animated) {
      return `<a:${this.name}:${this.id}>`;
    }
    return `<:${this.name}:${this.id}>`;
  }
}
