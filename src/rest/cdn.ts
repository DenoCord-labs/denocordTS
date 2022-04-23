import { BaseCdnUrl } from "../constants/mod.ts";
export enum FileTypes {
  JPG = "jpg",
  PNG = "png",
  GIF = "gif",
  WEBP = "webp",
}
export const ALLOWED_SIZES = [
  16, 32, 64, 128, 256, 512, 1024, 2048, 4096,
] as const;
type Format = {
  format?: keyof typeof FileTypes;
  size?: typeof ALLOWED_SIZES[number];
  animated?: boolean;
};
type FormatWithId = Format & { id: string };
type FormatWithHashAndId = FormatWithId & { hash: string };
type FormatWithHash = Format & { hash: string };
export class CDN {
  constructor() {}

  getCustomEmoji({ animated, id, format, size }: FormatWithId) {
    return `${BaseCdnUrl}/emojis/${id}.${
      animated ? "gif" : FileTypes[format || "PNG"]
    }?size=${size || 1024}`;
  }

  getGuildIcon({ id, format, animated, hash, size }: FormatWithHashAndId) {
    return `${BaseCdnUrl}/icons/${id}/${hash}.${
      animated
        ? "gif"
        : hash.startsWith("a_")
        ? "gif"
        : FileTypes[format || "PNG"]
    }?size=${size || 1024}`;
  }

  getGuildSplash({ id, format, animated, hash, size }: FormatWithHashAndId) {
    return `${BaseCdnUrl}/splashes/${id}/${hash}.${
      animated
        ? "gif"
        : hash.startsWith("a_")
        ? "gif"
        : FileTypes[format || "PNG"]
    }?size=${size || 1024}`;
  }

  getGuildDiscoverySplash({
    id,
    format,
    animated,
    hash,
    size,
  }: FormatWithHashAndId) {
    return `${BaseCdnUrl}/discovery-splashes/${id}/${hash}.${
      animated
        ? "gif"
        : hash.startsWith("a_")
        ? "gif"
        : FileTypes[format || "PNG"]
    }?size=${size || 1024}`;
  }

  getGuildBanner({ id, format, animated, hash, size }: FormatWithHashAndId) {
    return `${BaseCdnUrl}/banners/${id}/${hash}.${
      animated
        ? "gif"
        : hash.startsWith("a_")
        ? "gif"
        : FileTypes[format || "PNG"]
    }?size=${size || 1024}`;
  }

  getUserBanner({ id, format, hash, size }: FormatWithHashAndId) {
    return `${BaseCdnUrl}/user-backgrounds/${id}/${hash}.${
      FileTypes[format || "PNG"]
    }?size=${size || 1024}`;
  }
  getDefaultUserAvatar({
    format,
    discriminator,
    size,
  }: {
    size?: typeof ALLOWED_SIZES[number];
    format?: keyof typeof FileTypes;
    discriminator: string;
  }) {
    return `${BaseCdnUrl}/avatars/${parseInt(discriminator) % 5}.${
      FileTypes[format || "PNG"]
    }?size=${size || 1024}`;
  }
  getUserAvatar({ id, format, hash, size }: FormatWithHashAndId) {
    return `${BaseCdnUrl}/avatars/${id}/${hash}.${
      FileTypes[format || "PNG"]
    }?size=${size || 1024}`;
  }
  getGuildMemberAvatar({
    avatarHash,
    format,
    guildId,
    userId,
    size,
  }: {
    guildId: string;
    userId: string;
    avatarHash: string;
    format?: keyof typeof FileTypes;
    size?: typeof ALLOWED_SIZES[number];
  }) {
    return `${BaseCdnUrl}/guilds/${guildId}/users/${userId}/avatars/${avatarHash}.${
      FileTypes[format || "PNG"]
    }?size=${size || 1024}`;
  }
}
