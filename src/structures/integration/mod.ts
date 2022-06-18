import { APIGuildIntegration } from "../../../deps.ts";
import { Snowflake } from "../../types/mod.ts";
import { RestClient } from "../../http/rest.ts";
import { endpoints } from "../../constants/endpoints/mod.ts";
export class GuildIntegration {
  /**
   * Integration id
   */
  id: Snowflake;
  /**
   * Integration Name
   */
  name: string;
  /**
   * Integration type
   */
  type: string;
  /**
   * Is this integration enabled
   */
  enabled?: boolean;
  /**
   * Is this integration syncing
   * **This field is not provided for `discord` bot integrations.**
   */
  syncing?: boolean;
  /**
   * ID that this integration uses for "subscribers"
   *
   * **This field is not provided for `discord` bot integrations.**
   */
  roleId?: Snowflake;
  /**
   * ID that this integration uses for "subscribers"
   *
   * **This field is not provided for `discord` bot integrations.**
   */
  enableEmoticons?: boolean;
  /**
   * The behavior of expiring subscribers
   *
   * **This field is not provided for `discord` bot integrations.**
   *
   * See https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors
   */
  expireBehaviour?: APIGuildIntegration["expire_behavior"];
  /**
   * The grace period (in days) before expiring subscribers
   *
   * **This field is not provided for `discord` bot integrations.**
   */
  expireGracePeriod?: number;
  /**
   * User for this integration
   *
   * **This field is not provided for `discord` bot integrations.**
   *
   * See https://discord.com/developers/docs/resources/user#user-object
   */
  user?: APIGuildIntegration["user"];
  /**
   * Integration account information
   *
   * See https://discord.com/developers/docs/resources/guild#integration-account-object
   */
  account?: APIGuildIntegration["account"];
  /**
   * When this integration was last synced
   *
   * **This field is not provided for `discord` bot integrations.**
   */
  syncedAt?: string;
  /**
   * Has this integration been revoked
   *
   * **This field is not provided for `discord` bot integrations.**
   */
  revoked?: boolean;
  /**
   * The bot/OAuth2 application for discord integrations
   *
   * See https://discord.com/developers/docs/resources/guild#integration-application-object
   *
   * **This field is not provided for `discord` bot integrations.**
   */
  application?: APIGuildIntegration["application"];
  /**
   * How many subscribers this integration has
   *
   * **This field is not provided for `discord` bot integrations.**
   */
  subscriberCount?: number
  protected restClient = new RestClient();
  constructor(data: APIGuildIntegration, protected guildId: Snowflake) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.enabled = data.enabled;
    this.syncing = data.syncing
    this.roleId = data.role_id
    this.enableEmoticons = data.enable_emoticons
    this.expireBehaviour = data.expire_behavior
    this.expireGracePeriod = data.expire_grace_period
    this.user = data.user
    this.account = data.account
    this.syncedAt = data.synced_at
    this.revoked = data.revoked
    this.application = data.application
    this.subscriberCount = data.subscriber_count
  }
  async deleteIntegration() {
    return void await this.restClient.request(
      endpoints.deleteGuildIntegration(this.guildId, this.id),
      "DELETE",
    );
  }
}
