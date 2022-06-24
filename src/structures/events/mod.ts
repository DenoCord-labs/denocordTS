import {} from "../../../deps.ts";
import {
  APIGuildScheduledEvent,
  GuildScheduledEventEntityType,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventStatus,
} from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
import { User } from "../mod.ts";
export class GuildScheduledEvent {
  /**
   * The Id of the Scheduled Event
   */
  id: string;
  /**
   * The GuildId which the scheduled event belongs to
   */
  guildId: string;
  /**
   * the channel id in which the scheduled event will be hosted, or null if scheduled entity type is EXTERNAL
   */
  channelId: string | null;
  /**
   * the id of the user that created the scheduled event
   *
   * Note: `creatorId` will be null and creator will not be included for events created before October 25th, 2021, when the concept of `creatorId` was introduced and tracked.
   */
  creatorId?: string | null;
  /**
   * The name of the Event (1-100 characters)
   */
  name: string;
  /**
   * The description of the Event(1-1000 characters)
   */
  description?: string | null;
  /**
   * The time scheduled Event will start
   *
   * `ISO8601 Timestamp`
   */
  scheduledStartTime: string;
  /**
   * the time the scheduled event will end, required if entityType is EXTERNAL
   *
   * `ISO8601 Timestamp`
   */
  scheduledEndTime: string | null;
  /**
   * The privacy level of the Event
   */
  privacyLevel: keyof typeof GuildScheduledEventPrivacyLevel;
  /**
   * The Status of the Scheduled Event
   */
  status: keyof typeof GuildScheduledEventStatus;
  /**
   * The type of Scheduled Event
   */
  entityType: keyof typeof GuildScheduledEventEntityType;
  /**
   * the id of an entity associated with a guild scheduled event
   */
  entityId: string | null;
  /**
   * additional metadata for the guild scheduled event
   */
  entityMetadata: APIGuildScheduledEvent["entity_metadata"];
  /**
   * The User that created the scheduled Event
   */
  creator?: User;
  /**
   * 	the number of users subscribed to the scheduled event
   */
  userCount?: number;
  /**
   * the cover image hash of the scheduled event
   */
  image?: string | null;
  constructor(protected d: APIGuildScheduledEvent, protected client: Base) {
    this.id = d.id;
    this.guildId = d.guild_id;
    this.channelId = d.channel_id;
    this.creatorId = d.creator_id;
    this.name = d.name;
    this.description = d.description;
    this.scheduledStartTime = d.scheduled_start_time;
    this.scheduledEndTime = d.scheduled_end_time;
    this.privacyLevel = "GuildOnly";
    this.status = d.status === 1
      ? "Scheduled"
      : d.status === 2
      ? "Active"
      : d.status === 3
      ? "Completed"
      : "Canceled";
    this.entityType = d.entity_type === 1
      ? "StageInstance"
      : d.entity_type === 2
      ? "Voice"
      : "External";
    this.entityId = d.entity_id;
    this.entityMetadata = d.entity_metadata;
    if ("creator_id" in d) {
      this.creator = this.client.cache.users.get(d.creator_id!);
    }
    this.userCount = d.user_count;
    this.image = d.image;
  }
}
