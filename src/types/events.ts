// deno-lint-ignore-file no-explicit-any
import { ClientMessage } from "../structures/messages/mod.ts";
import { BaseMessage } from "../structures/messages/Base.ts";
import { APIMessage } from "./mod.ts";
export type SnakeToCamelCase<S extends string> = S extends
	`${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
	: S;
export type Message = {
	[K in keyof APIMessage as SnakeToCamelCase<K>]: APIMessage[K];
};
export type GatewayEvents = {
	ChannelCreate: (e: any) => any;
	ChannelDelete: (e: any) => any;
	ChannelPinsUpdate: (e: any) => any;
	ChannelUpdate: (e: any) => any;
	GuildBanAdd: (e: any) => any;
	GuildBanRemove: (e: any) => any;
	GuildCreate: (e: any) => any;
	GuildDelete: (e: any) => any;
	GuildEmojisUpdate: (e: any) => any;
	GuildIntegrationsUpdate: (e: any) => any;
	GuildMemberAdd: (e: any) => any;
	GuildMemberRemove: (e: any) => any;
	GuildMembersChunk: (e: any) => any;
	GuildMemberUpdate: (e: any) => any;
	GuildRoleCreate: (e: any) => any;
	GuildRoleDelete: (e: any) => any;
	GuildRoleUpdate: (e: any) => any;
	GuildStickersUpdate: (e: any) => any;
	GuildUpdate: (e: any) => any;
	IntegrationCreate: (e: any) => any;
	IntegrationDelete: (e: any) => any;
	IntegrationUpdate: (e: any) => any;
	InteractionCreate: (e: any) => any;
	InviteCreate: (e: any) => any;
	InviteDelete: (e: any) => any;
	MessageCreate: (e: ClientMessage | BaseMessage) => any;
	MessageDelete: (e: Message) => any;
	MessageDeleteBulk: (e: any) => any;
	MessageReactionAdd: (e: any) => any;
	MessageReactionRemove: (e: any) => any;
	MessageReactionRemoveAll: (e: any) => any;
	MessageReactionRemoveEmoji: (e: any) => any;
	MessageUpdate: (e: any) => any;
	PresenceUpdate: (e: any) => any;
	StageInstanceCreate: (e: any) => any;
	StageInstanceDelete: (e: any) => any;
	StageInstanceUpdate: (e: any) => any;
	Ready: (e: undefined) => any;
	ThreadCreate: (e: any) => any;
	ThreadDelete: (e: any) => any;
	ThreadListSync: (e: any) => any;
	ThreadMembersUpdate: (e: any) => any;
	ThreadMemberUpdate: (e: any) => any;
	ThreadUpdate: (e: any) => any;
	TypingStart: (e: any) => any;
	UserUpdate: (e: any) => any;
	VoiceServerUpdate: (e: any) => any;
	VoiceStateUpdate: (e: any) => any;
	WebhooksUpdate: (e: any) => any;
	GuildScheduledEventCreate: (e: any) => any;
	GuildScheduledEventUpdate: (e: any) => any;
	GuildScheduledEventDelete: (e: any) => any;
	GuildScheduledEventUserAdd: (e: any) => any;
	GuildScheduledEventUserRemove: (e: any) => any;
	Error: (e: any) => any;
};
