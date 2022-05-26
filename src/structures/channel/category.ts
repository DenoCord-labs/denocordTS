import { APIGuildCategoryChannel } from "../../types/mod.ts";

export class GuildCategory {
  flags;
  guildId;
  id;
  name;
  nsfw;
  parentId;
  position;
  permissionOverwrites;
  type;
  constructor(d: APIGuildCategoryChannel) {
    this.type = d.type;
    this.flags = d.flags;
    this.guildId = d.guild_id;
    this.id = d.id;
    this.name = d.name;
    this.nsfw = d.nsfw;
    this.parentId = d.parent_id;
    this.position = d.position;
    this.permissionOverwrites = d.permission_overwrites;
  }
}
