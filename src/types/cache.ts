import {
	APIChannel,
	APIEmoji,
	APIGuild,
	APIGuildMember,
	APIRole,
	APIUser,
	Camelize,
} from "./mod.ts";
import {
	Guild,
	User,
	DmChannel,
	TextChannel,
	ThreadChannel,
	GuildMember as Member,
} from "../structures/mod.ts";
import { Collection } from "../../deps.ts";
export type Channel = DmChannel | TextChannel | ThreadChannel;

export type Role = APIRole;
export type Emoji = APIEmoji;

export type cacheFields = {
	guilds: Collection<string, Guild>;
	channels: Collection<string, DmChannel | TextChannel | ThreadChannel>;
	users: Collection<string, User>;
	emojis: Collection<string, Emoji>;
	roles: Collection<string, Role>;
	members: Collection<string, Member>;
};
