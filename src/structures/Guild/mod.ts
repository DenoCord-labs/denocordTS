import {
  APIBan,
  APIGuild,
  APIRole,
  ChannelType,
  PermissionFlagsBits,
  Snowflake,
  GuildFeature,
  APISticker,
  APIGuildIntegration,
} from "../../types/mod.ts";
import { Camelize, camelize } from "../../../deps.ts";
import { Base } from "../../client/base.ts";
import { GuildMember, TextChannel, ThreadChannel, GuildNewsChannel, GuildSticker, GuildIntegration } from "../mod.ts";
import { ColorResolvable, resolveColor } from "../../utils/mod.ts";
import { RestClientInstance } from "../../http/rest.ts";
import { endpoints } from "../../constants/endpoints/mod.ts"
import { Messages } from "../../errors/messages.ts"

type GuildProperties = Camelize<APIGuild> & {
  channnels: (TextChannel | ThreadChannel)[]
};

export class Guild {
  iconHash: GuildProperties["iconHash"];
  discoverySplash: GuildProperties["discoverySplash"];
  owner: GuildProperties["owner"];
  ownerId: GuildProperties["ownerId"];
  permissions: GuildProperties["permissions"];
  afkChannelId: GuildProperties["afkChannelId"];
  afkTimeout: GuildProperties["afkTimeout"];
  widgetEnabled: GuildProperties["widgetEnabled"];
  widgetChannelId: GuildProperties["widgetChannelId"];
  verificationLevel: GuildProperties["verificationLevel"];
  defaultMessageNotifications: GuildProperties["defaultMessageNotifications"];
  explicitContentFilter: GuildProperties["explicitContentFilter"];
  roles: GuildProperties["roles"];
  emojis: GuildProperties["emojis"];
  features: GuildFeature[];
  mfaLevel: GuildProperties["mfaLevel"];
  systemChannelId: GuildProperties["systemChannelId"];
  systemChannelFlags: GuildProperties["systemChannelFlags"];
  rulesChannelId: GuildProperties["rulesChannelId"];
  channels?: (TextChannel | ThreadChannel | GuildNewsChannel)[];
  maxPresences: GuildProperties["maxPresences"];
  maxMembers: GuildProperties["maxMembers"];
  vanityUrlCode: GuildProperties["vanityUrlCode"];
  description: GuildProperties["description"];
  banner: GuildProperties["banner"];
  premiumTier: GuildProperties["premiumTier"];
  premiumSubscriptionCount: GuildProperties["premiumSubscriptionCount"];
  preferredLocale: GuildProperties["preferredLocale"];
  publicUpdatesChannelId: GuildProperties["publicUpdatesChannelId"];
  maxVideoChannelUsers: GuildProperties["maxVideoChannelUsers"];
  approximateMemberCount: GuildProperties["approximateMemberCount"];
  approximatePresenceCount: GuildProperties["approximatePresenceCount"];
  welcomeScreen: GuildProperties["welcomeScreen"];
  nsfwLevel: GuildProperties["nsfwLevel"];
  stickers: GuildSticker[];
  premiumProgressBarEnabled: GuildProperties["premiumProgressBarEnabled"];
  hubType: GuildProperties["hubType"];
  name: string;
  icon: string | null;
  splash: string | null;
  unavailable: GuildProperties["unavailable"];
  id: GuildProperties["id"];

  private rest = RestClientInstance
  constructor(protected data: APIGuild, private client: Base) {

    this.afkChannelId = data.afk_channel_id;
    this.afkTimeout = data.afk_timeout;
    this.approximateMemberCount = data.approximate_member_count;
    this.approximatePresenceCount = data.approximate_presence_count;
    this.banner = data.banner;
    this.defaultMessageNotifications = data.default_message_notifications;
    this.description = data.description;
    this.discoverySplash = data.discovery_splash;
    this.emojis = data.emojis;
    this.explicitContentFilter = data.explicit_content_filter;
    this.features = data.features;
    this.iconHash = data.icon_hash;
    this.id = data.id;
    this.maxMembers = data.max_members;
    this.maxPresences = data.max_presences;
    this.maxVideoChannelUsers = data.max_video_channel_users;
    this.mfaLevel = data.mfa_level;
    this.name = data.name;
    this.owner = data.owner;
    this.ownerId = data.owner_id;
    this.premiumSubscriptionCount = data.premium_subscription_count;
    this.premiumTier = data.premium_tier;
    this.publicUpdatesChannelId = data.public_updates_channel_id;
    this.rulesChannelId = data.rules_channel_id;
    this.roles = data.roles;
    this.rulesChannelId = data.rules_channel_id;
    this.systemChannelId = data.system_channel_id;
    this.systemChannelFlags = data.system_channel_flags;
    this.systemChannelId = data.system_channel_id;
    this.vanityUrlCode = data.vanity_url_code;
    this.verificationLevel = data.verification_level;
    this.widgetChannelId = data.widget_channel_id;
    this.widgetEnabled = data.widget_enabled;
    this.welcomeScreen = data.welcome_screen;
    this.nsfwLevel = data.nsfw_level;
    this.stickers = data.stickers.map(sticker => new GuildSticker(sticker, this.client));
    this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
    this.hubType = data.hub_type;
    this.icon = data.icon;
    this.splash = data.splash;
    this.unavailable = data.unavailable;
    this.verificationLevel = data.verification_level;

    this.preferredLocale = data.preferred_locale;
    this.channels = [];
    this.channels = this.client.cache.guilds.get(this.id)?.channels?.map(channel => channel)
  }
  /**
   * 
   * @deprecated
   */
  get region() {
    return this.data.region;
  }
  async fetchVanityUrl() {
    if (!this.features.includes(GuildFeature.VanityURL)) {
      throw new Error(Messages.VANITY_URL, {
        cause: new Error("Trying to Fetch Vanity URL of a Guild.")
      })
    }
    const data = await (await this.rest.request(endpoints.getGuildVanityUrl(this.id), "GET")).json()
    this.vanityUrlCode = data.code
    return data
  }
  async createChannel({
    channelType,
    name,
    parentId,
    autoArchiveDuration,
    bitrate,
    nsfw,
    position,
    slowMode,
    topic,
    userLimit,
    reason,
  }: {
    /**
     * The name of the channel
     */
    name: string;
    /**
     * The Type of the channel
     */
    channelType: keyof typeof ChannelType;
    /**
     * Topic of the channel
     */
    topic?: string;
    /**
     * Bitrate (in bits) of the voice channel
     */
    bitrate?: number;
    /**
     * User Limit of the voice channel
     */
    userLimit?: number;
    /**
     * SlowMode Duration
     * Value must be between `0 - 21600`
     */
    slowMode?: number;
    /**
     * Position of the channel in the category
     */
    position?: number;
    /**
     * Id of the Category
     */
    parentId: Snowflake;
    /**
     * Whether the channel is nsfw
     */
    nsfw?: boolean;
    /**
     * Duration in minutes to archive the thread automatically
     * Available Values: `60` | `1440` | `10080` | `43200`
     */
    autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
    /**
     * The Reason to Create this channel
     */
    reason?: string;
  }) {
    const headers = new Headers();
    if (reason) {
      headers.append("X-Audit-Log-Reason", reason);
    }
    const body: Record<string, string | number | boolean> = {};
    body["name"] = name;
    body["parent_id"] = parentId;
    body["topic"] = topic || "";
    body["type"] = ChannelType[channelType];
    body["rate_limit_per_user"] = slowMode || 0;
    if (position) {
      body["position"] = position;
    }
    body["nsfw"] = Boolean(nsfw);
    if (
      body.type == ChannelType["GuildVoice"] ||
      body.type == ChannelType["GuildStageVoice"]
    ) {
      if (!bitrate) {
        throw new Error("Bitrate is required for voice channels");
      }

      body["bitrate"] = bitrate;
      if (userLimit) body["user_limit"] = userLimit;
    }
    if (
      body.type == ChannelType["GuildPrivateThread"] ||
      body.type == ChannelType["GuildNewsThread"] ||
      body.type == ChannelType["GuildPublicThread"]
    ) {
      if (autoArchiveDuration) {
        body["default_auto_arhive_duration"] = autoArchiveDuration;
      }
    }
    return await this.rest.request(
      `/guilds/${this.id}/channels`,
      "POST",
      body,
      headers,
    );
  }
  async changeChannelPosition({
    channelId,
    position,
    lockPermissions,
    parentId,
    reason,
  }: {
    channelId: Snowflake;
    position: number;
    parentId?: Snowflake;
    lockPermissions?: boolean;
    reason?: string;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    const body: Record<string, Snowflake | boolean | number> = {};
    body["id"] = channelId;
    if (position) body["position"] = position;
    body["lock_permissions"] = lockPermissions || true;
    if (parentId) body["parent_id"] = parentId;
    await this.rest.request(
      `/guilds/${this.id}/channels`,
      "PATCH",
      body,
      reason ? headers : undefined,
    );
  }
  async fetchGuildMember(userId: Snowflake) {
    const res = await (
      await this.rest.request(
        `/guilds/${this.id}/members/${userId}`,
        "GET",
      )
    ).json();

    return new GuildMember(
      res,
      this.client,
      this.client.cache.guilds.get(`${this.id}`)?.ownerId ===
      res.user?.id,
    ) as Partial<GuildMember>;
  }
  async changeClientNickname({
    nickname,
    reason,
  }: {
    nickname: string;
    reason?: string;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    return void (await this.rest.request(
      `/guilds/${this.id}/members/@me`,
      "PATCH",
      { nick: nickname },
      reason ? headers : undefined,
    ));
  }
  async addRoleToGuildMember({
    roleId,
    userId,
    reason,
  }: {
    userId: Snowflake;
    roleId: Snowflake;
    reason?: string;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    return void (await this.rest.request(
      `/guilds/${this.id}/members/${userId}/roles/${roleId}`,
      "PUT",
      undefined,
      reason ? headers : undefined,
    ));
  }
  async removeRoleFromGuildMember({
    roleId,
    userId,
    reason,
  }: {
    reason?: string;
    userId: Snowflake;
    roleId: Snowflake;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    return void (await this.rest.request(
      `/guilds/${this.id}/members/${userId}/roles/${roleId}`,
      "DELETE",
      undefined,
      reason ? headers : undefined,
    ));
  }
  async removeGuildMember({
    userId,
    reason,
  }: {
    userId: Snowflake;
    reason?: string;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    return void (await this.rest.request(
      `/guilds/${this.id}/members/${userId}`,
      "DELETE",
      undefined,
      reason ? headers : undefined,
    ));
  }
  /**
   * Used to fetch Guild Bans, Will fetch top 10 if limit isn't specified
   */
  async fetchGuildBans(limit?: number) {
    const body: Record<string, number> = {};
    body["limit"] = limit || 10;
    return camelize(
      await (
        await this.rest.request(`/guilds/${this.id}/bans`, "GET")
      ).json(),
    ) as Camelize<APIBan>[];
  }

  async fetchGuildBan({ userId }: { userId: Snowflake }) {
    return camelize(
      await await (
        await this.rest.request(
          `/guilds/${this.id}/bans/${userId}`,
          "GET",
        )
      ).json(),
    ) as Camelize<APIBan>;
  }

  async createBan({
    userId,
    reason,
  }: {
    userId: Snowflake;
    reason?: string;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    return void (await this.rest.request(
      `/guilds/${this.id}/bans/${userId}`,
      "PUT",
      undefined,
      reason ? headers : undefined,
    ));
  }
  async removeGuildBan({
    userId,
    reason,
  }: {
    userId: Snowflake;
    reason?: string;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    return void (await this.rest.request(
      `/guilds/${this.id}/bans/${userId}`,
      "DELETE",
      undefined,
      headers,
    ));
  }
  async fetchRoles() {
    return camelize(
      await (
        await this.rest.request(`/guilds/${this.id}/roles`, "GET")
      ).json(),
    ) as Camelize<APIRole>[];
  }

  async createRole({
    name,
    permission,
    color,
    displaySeparatelyInSidebar,
    mentionable,
    reason,
  }: {
    name: string;
    permission: (keyof typeof PermissionFlagsBits)[];
    color?: ColorResolvable;
    displaySeparatelyInSidebar?: boolean;
    mentionable?: boolean;
    reason?: string;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    const body: Record<string, string | number | boolean> = {};
    body["name"] = name;
    let permissions = 0n;
    for await (const perm of permission) {
      permissions |= PermissionFlagsBits[perm];
    }
    body["permissions"] = String(permissions);
    body["color"] = color ? (resolveColor(color) as number) : 0;
    body["hoist"] = displaySeparatelyInSidebar || false;
    body["mentionable"] = mentionable || false;
    return camelize(
      await (
        await this.rest.request(
          `/guilds/${this.id}/roles`,
          "POST",
          body,
          headers,
        )
      ).json(),
    ) as Camelize<APIRole>;
  }
  async modifyRole({
    name,
    permission,
    color,
    displaySeparatelyInSidebar,
    mentionable,
    reason,
    roleId,
  }: {
    name: string;
    permission?: (keyof typeof PermissionFlagsBits)[] | bigint;
    color?: ColorResolvable;
    displaySeparatelyInSidebar?: boolean;
    mentionable?: boolean;
    reason?: string;
    roleId: Snowflake;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    const body: Record<string, number | string | boolean> = {};
    body["name"] = name;
    let permissions = 0n;
    if (typeof permission === "bigint") {
      permissions = permission;
    } else {
      for await (const perm of permission || []) {
        permissions |= PermissionFlagsBits[perm];
      }
    }
    body["permissions"] = String(permissions);
    body["color"] = color ? (resolveColor(color) as number) : 0;
    body["hoist"] = displaySeparatelyInSidebar || false;
    body["mentionable"] = mentionable || false;
    return camelize(
      await (
        await this.rest.request(
          `/guilds/${this.id}/roles/${roleId}`,
          "PATCH",
          body,
          headers,
        )
      ).json(),
    ) as Camelize<APIRole>;
  }
  async deleteRole({
    roleId,
    reason,
  }: {
    roleId: Snowflake;
    reason?: string;
  }) {
    const headers = new Headers();
    if (reason) headers.append("X-Audit-Log-Reason", reason);
    return void (await this.rest.request(
      `/guilds/${this.id}/roles/${roleId}`,
      "DELETE",
      undefined,
      headers,
    ));
  }
  async listStickers() {
    const data = await (await this.rest.request(`/guilds/${this.id}/stickers`, "GET")).json()
    const stickers = (data as APISticker[]).map(sticker => new GuildSticker(sticker, this.client))
    return stickers
  }
  // async getSticker(stickerId: string) {
  //   const data = await (await this.rest.request(`/guilds/${this.id}/stickers/${stickerId}`, "GET")).json()
  //   const sticker = new GuildSticker(data as APISticker, this.client)
  //   return sticker
  // }
  // async createSticker({
  //   description, filePath, name, tags, fileName
  // }: {
  //   /**
  //    * The Name of the Sticker
  //    */
  //   name: string,
  //   /**
  //    * The Description of the Sticker
  //    */
  //   description: string
  //   /**
  //    * The AutoComplete Tags for the sticker
  //    */
  //   tags: string,
  //   /**
  //    * The Path of the file to upload
  //    */
  //   filePath: string
  //   /**
  //    * Name of the File
  //    */
  //   fileName: string
  // }) {
  //   if (name.length < 2) {
  //     throw new Error(`Name of Sticker can't be less than 2 characters.`)
  //   }
  //   if (name.length > 30) {
  //     throw new Error(`Name of Sticker must not exceed 30 characters.`)
  //   }
  //   if (description && description.length < 2) {
  //     throw new Error("Description Can't be less than 2 characters.")
  //   }
  //   if (description && description.length > 100) {
  //     throw new Error("Description can't exceed 100 charaters.")
  //   }
  //   if (tags.length > 200) {
  //     throw new Error("Tags must not exceed 200 characters.")
  //   }
  //   const fileStats = await Deno.stat(filePath)
  //   if (fileStats.size > 500000) // 500 kb
  //   {
  //     throw new Error("File Size exceed Max Size(500kb)")
  //   }

  //   const headers = new Headers()
  //   headers.append("Content-Disposition", `form-data; filename=${fileName};name=${name}`)
  //   const formData = new FormData()
  //   formData.append("file", new Blob([Deno.readFileSync(filePath)], {
  //     type: "image/png",
  //   }))
  //   formData.append("name", name)
  //   formData.append("description", description)
  //   formData.append("tags", tags)
  //   console.log(formData)
  //   const res = await (await this.rest.request(`/guilds/${this.id}/stickers`, "POST", formData, headers, true, true)).json()
  //   const sticker = new GuildSticker(res, this.client)
  //   return sticker
  // }
  async modifySticker({ description, name, tags, stickerId }: {
    /**
     * New Name of Sticker (2-30 characters)
     */
    name: string
    /**
     * New Description of Sticker (2-100 characters)
     */
    description: string
    /**
     * New Tags of Sticker(for Autocomplete)(max 200 characters)
     */
    tags: string
    /**
     * Id of Sticker
     */
    stickerId: string
  }) {
    if (name.length < 2) {
      throw new Error(`Name of Sticker can't be less than 2 characters.`)
    }
    if (name.length > 30) {
      throw new Error(`Name of Sticker must not exceed 30 characters.`)
    }
    if (description && description.length < 2) {
      throw new Error("Description Can't be less than 2 characters.")
    }
    if (description && description.length > 100) {
      throw new Error("Description can't exceed 100 charaters.")
    }
    if (tags.length > 200) {
      throw new Error("Tags must not exceed 200 characters.")
    }
    const data = await (await this.rest.request(`/guilds/${this.id}/stickers/${stickerId}`, "PATCH", {
      name, tags, description
    })).json()
    return new GuildSticker(data, this.client)
  }
  async deleteSticker(stickerId: string): Promise<void> {
    return void (await this.rest.request(`/guilds/${this.id}/stickers/${stickerId}`, "DELETE"))
  }

  // async listAutoModerationRules() {
  //   return await (await this.rest.request(`/guilds/${this.id}/auto-moderation/rules`, "GET")).json()
  // }
  /**
   * Returns a List of Integrations for the Guild
   */
  async getGuildIntegrations(): Promise<GuildIntegration[]> {
    const data = await (await this.rest.request(`/guilds/${this.id}/integrations`, "GET")).json() as APIGuildIntegration[]
    const integration = data.map(integration => new GuildIntegration(integration, this.id))
    return integration
  }
  /**
   * Delete Integration
   */
  async deleteIntegration(integrationId: string): Promise<void> {
    return void (await this.rest.request(`/guilds/${this.id}/integrations/${integrationId}`, "DELETE"))
  }
}
