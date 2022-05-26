import { APINewsChannel } from "../../types/mod.ts";
import { TextChannel } from "./mod.ts";
import { Base } from "../../client/base.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";
import { RestClientInstance } from "../../http/rest.ts";
const { followNewsChannel } = endpoints;
export class GuildNewsChannel extends TextChannel {
  defaultAutoArchiveDuration;
  flags;
  guildId;
  id;
  lastMessageId;
  lastPinTimestamp;
  name;
  nsfw;
  parentId;
  permissionOverwrites;
  position;
  topic;
  type;
  constructor(d: APINewsChannel, client: Base) {
    super(d, client);
    this.defaultAutoArchiveDuration = d.default_auto_archive_duration;
    this.flags = d.flags;
    this.guildId = d.guild_id;
    this.id = d.id;
    this.lastMessageId = d.last_message_id;
    this.lastPinTimestamp = d.last_pin_timestamp;
    this.name = d.name;
    this.nsfw = d.nsfw;
    this.parentId = d.parent_id;
    this.permissionOverwrites = d.permission_overwrites;
    this.position = d.position;
    this.topic = d.topic;
    this.type = d.type;
  }
  async addFollower(channelId: string) {
    await RestClientInstance.request(followNewsChannel(this.id), "POST", {
      webhook_channel_id: channelId,
    });
    return this;
  }
}
