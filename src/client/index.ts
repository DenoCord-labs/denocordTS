import { ClientOptions } from "../types/ClientOptions.ts";
import { Presence } from "../types/presence.ts";
import { setPresence } from "../websockets/payloads/presence.ts";
import { BaseClient } from "./BaseClient.ts";
import { Guild } from "../types/Guild.ts";
import { BASE_CDN_URL } from "../constants/index.ts";
export const ALLOWED_SIZES = [
  16, 32, 64, 128, 256, 512, 1024, 2048, 4096,
] as const;
type Format = {
  format?: "png" | "jpg" | "gif" | "webp";
  size?: typeof ALLOWED_SIZES[number];
};
type FormatWithId = Format & { id: string };
type FormatWithHashAndId = FormatWithId & { hash: string };
type FormatWithHash = Format & { hash: string };
export class Client extends BaseClient {
  /**
   *
   * Creates a Discord Client
   * @param {ClientOptions} options The options to create the Client with
   */

  constructor(options: ClientOptions) {
    super(options.token, options.intents, options.clientId);
  }
  setPresence(presence: Presence) {
    setPresence(this.websocket, presence);
  }
  /**
   *
   * @returns {number} The uptime of the Client in Milliseconds
   */
  getUptime(): number {
    return new Date().getTime() - this.uptime;
  }
  getCachedGuilds() {
    if (this.cache.has("guilds")) {
      return this.cache.get("guilds") as Guild[];
    }
    return null;
  }
  getCachedGuild(id: string) {
    if (this.cache.has("guilds")) {
      const guilds = this.cache.get("guilds") as Guild[];
      return guilds.find((g) => g.id === id);
    }
    return null;
  }
  fetchEmojis({ id, format, size }: FormatWithId) {
    return `${BASE_CDN_URL}/emojis/${id}.${format || "png"}?size=${
      size || 1024
    }`;
  }
  fetchGuildIcon({ id, hash, format, size }: FormatWithHashAndId) {
    return `${BASE_CDN_URL}/icons/${id}/${hash}.${format || "png"}?size=${
      size || 1024
    }`;
  }
  fetchGuildSplash({ id, format, hash, size }: FormatWithHashAndId) {
    return `${BASE_CDN_URL}/splashes/${id}/${hash}.${format || "png"}?size=${
      size || 1024
    }`;
  }
  fetchGuildDiscoverySplash({ id, format, hash, size }: FormatWithHashAndId) {
    return `${BASE_CDN_URL}/discovery-splashes/${id}/${hash}.${
      format || "png"
    }?size=${size || 1024}`;
  }
  fetchGuildBanner({ id, format, hash, size }: FormatWithHashAndId) {
    return `${BASE_CDN_URL}/banners/${id}/${hash}.${format || "png"}?size=${
      size || 1024
    }`;
  }
  fetchUserBanner({ id, format, hash, size }: FormatWithHashAndId) {
    return `${BASE_CDN_URL}/user-backgrounds/${id}/${hash}.${
      format || "png"
    }?size=${size || 1024}`;
  }
  fetchDefaultUserAvatar({ format, hash, size }: FormatWithHash) {
    return `${BASE_CDN_URL}/avatars/${hash}.${format || "png"}?size=${
      size || 1024
    }`;
  }
  fetchUserAvatar({ id, format, hash, size }: FormatWithHashAndId) {
    return `${BASE_CDN_URL}/avatars/${id}/${hash}.${format || "png"}?size=${
      size || 1024
    }`;
  }
  fetchGuildMemberAvatar({
    avatarHash,
    format,
    guildId,
    userId,
    size,
  }: {
    guildId: string;
    userId: string;
    avatarHash: string;
    format?: "png" | "gif" | "jpg" | "webp";
    size?: typeof ALLOWED_SIZES[number];
  }) {
    return `${BASE_CDN_URL}/guilds/${guildId}/users/${userId}/avatars/${avatarHash}.${
      format || "png"
    }?size=${size || 1024}`;
  }
  async getFromCache(key: string) {
    if (this.cache.has(key)) {
      return await this.cache.get(key);
    }
    return null;
  }
}
