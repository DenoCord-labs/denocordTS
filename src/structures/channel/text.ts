import { APIInvite, Snowflake } from "../../types/mod.ts";
import { Base } from "../../client/base.ts";
import { BaseChannel } from "./base.ts";
import { Camelize, camelize } from "../../../deps.ts";
import { ThreadChannel } from "./mod.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";
enum ThreadTypes {
  PublicThread = 11,
  PrivateThread,
}

export class TextChannel extends BaseChannel {
  constructor(d: any, protected client: Base) {
    super(d, client);
  }
  async createInvite({
    maxAge,
    maxUses,
    temporary,
    unique,
  }: {
    maxAge?: number;
    maxUses?: number;
    temporary?: boolean;
    unique?: boolean;
  }) {
    const body: Record<
      string,
      number | string | boolean | null | undefined
    > = {};
    body["max_age"] = maxAge;
    body["max_uses"] = maxUses;
    body["temporary"] = temporary;
    body["unique"] = unique;

    const res = await super.restClient.request(
      `/channels/${this.id}/invites`,
      "POST",
      body,
    );
    return camelize(await res.json()) as Camelize<APIInvite>;
  }
  async createThread({
    name,
    type,
    autoArchiveDuration,
    slowMode,
  }: {
    /**
     * 1-100 Character Channel Name
     */
    name: string;
    /**
     * Duration in minutes to archive the thread automatically
     * Available Values: `60` | `1440` | `10080` | `43200`
     */
    autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
    /**
     * Type of thread to create
     */
    type: keyof typeof ThreadTypes;
    /**
     * amount of seconds a user has to wait before sending another message (0-21600)
     */
    slowMode?: number;
  }) {
    const body: Record<
      string,
      string | number | boolean | null | undefined
    > = {};
    body["name"] = name;
    body["type"] = type;
    body["auto_archive_duration"] = autoArchiveDuration;
    body["rate_limit_per_user"] = slowMode;
    const res = await super.restClient.request(
      `/channels/${this.id}/messages`,
      "POST",
      body,
    );
    return new ThreadChannel(await res.json(), this.client);
  }
  async createThreadFromMessage({
    messageId,
    name,
    autoArchiveDuration,
    slowMode,
  }: {
    messageId: Snowflake;
    name: string;
    autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
    slowMode?: number;
  }) {
    const body: Record<
      string,
      string | number | boolean | null | undefined
    > = {};
    body["name"] = name;
    body["auto_archive_duration"] = autoArchiveDuration;
    body["rate_limit_per_user"] = slowMode;
    const res = await super.restClient.request(
      `/channels/${this.id}/messages/${messageId}/thread`,
      "POST",
      body,
    );
    return new ThreadChannel(await res.json(), this.client);
  }
}
