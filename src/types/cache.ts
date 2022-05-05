import {
	APIChannel,
	APIEmoji,
	APIGuild,
	APIGuildMember,
	APIRole,
	APIUser,
} from "./mod.ts";
import { SnakeToCamelCase } from "./events.ts";
export type Member = {
	[K in keyof APIGuildMember as SnakeToCamelCase<K>]: APIGuildMember[K];
};
export type Guild = {
	[K in keyof APIGuild as SnakeToCamelCase<K>]: APIGuild[K];
};
export type Channel = {
	[K in keyof APIChannel as SnakeToCamelCase<K>]: APIChannel[K];
};
export type User = {
	[K in keyof APIUser as SnakeToCamelCase<K>]: APIUser[K];
};
export type Role = {
	[K in keyof APIRole as SnakeToCamelCase<K>]: APIRole[K];
};
export type Emoji = {
	[K in keyof APIEmoji as SnakeToCamelCase<K>]: APIEmoji[K];
};

export type cacheFields = {
	guilds: Record<string, Guild>;
	channels: Record<string, Channel>;
	users: Record<string, User>;
	emojis: Record<string, Emoji>;
	roles: Record<string, Role>;
	members: Record<string, Member>;
};
