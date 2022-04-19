import { APIGuild, APIChannel, APIUser,APIEmoji,APIRole } from "../../deps.ts";

export type cacheFields = {
    guilds: Record<string, APIGuild>;
    channels: Record<string, APIChannel>;
    users: Record<string, APIUser>;
    emojis: Record<string, APIEmoji>;
    roles: Record<string, APIRole>;
    getGuild(guildId: string): APIGuild | undefined;
    getChannel(channelId: string): APIChannel | undefined;
    getUser(userId: string): APIUser | undefined;
    getEmoji(emojiId: string): APIEmoji | undefined;
    getRole(roleId: string): APIRole | undefined;
};

