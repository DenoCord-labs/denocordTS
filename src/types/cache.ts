import {
	APIChannel,
	APIEmoji,
	APIGuild,
	APIGuildMember,
	APIRole,
	APIUser,
	Camelize,
} from "./mod.ts";
import {Collection} from "../../deps.ts"
export type Member = Camelize<APIGuildMember>;
export type Guild = Camelize<APIGuild>;
export type Channel = Camelize<APIChannel>;
export type User = Camelize<APIUser>;
export type Role = Camelize<APIRole>;
export type Emoji = Camelize<APIEmoji>;

export type cacheFields = {
	guilds: Collection<string, Guild>;
	channels: Collection<string, Channel>;
	users: Collection<string, User>;
	emojis: Collection<string, Emoji>;
	roles: Collection<string, Role>;
	members: Collection<string, Member>;
};
