import {
	APIChannel,
	APIEmoji,
	APIGuild,
	APIGuildMember,
	APIRole,
	APIUser,
	Camelize,
} from "./mod.ts";
export type Member = Camelize<APIGuildMember>;
export type Guild = Camelize<APIGuild>;
export type Channel = Camelize<APIChannel>;
export type User = Camelize<APIUser>;
export type Role = Camelize<APIRole>;
export type Emoji = Camelize<APIEmoji>;

export type cacheFields = {
	guilds: Record<string, Guild>;
	channels: Record<string, Channel>;
	users: Record<string, User>;
	emojis: Record<string, Emoji>;
	roles: Record<string, Role>;
	members: Record<string, Member>;
};
