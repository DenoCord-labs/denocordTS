import { RestClient } from "./rest.ts";
import { Snowflake } from "../types/mod.ts";
import type { SlashCommand } from "../structures/mod.ts";
import { endpoints } from "../constants/endpoints/mod.ts";
const rest = new RestClient();

export async function registerGlobalSlashCommands(
	commands: SlashCommand[],
	clientId: Snowflake,
) {
	await rest.request(
		endpoints.createGlobalApplicationCommands(clientId),
		"PUT",
		commands.map((cmd) => cmd.toJSON()),
		undefined,
		false,
	);
}

export async function registerGuildSlashCommands(
	commands: SlashCommand[],
	clientId: Snowflake,
	guildId: Snowflake,
) {
	await rest.request(
		endpoints.createGuildApplicationCommand(clientId, guildId),
		"PUT",
		commands.map((cmd) => cmd.toJSON()),
		undefined,
		false,
	);
}

export async function createMessage(channelId: Snowflake, body: unknown) {
	return await rest.request(endpoints.createMessage(channelId), "POST", body);
}

export async function deleteMessage(
	channelId: Snowflake,
	messageId: Snowflake,
	headers?: HeadersInit,
) {
	return void (await rest.request(
		endpoints.deleteMessage(channelId, messageId),
		"DELETE",
		undefined,
		headers,
	));
}

export async function addReaction(
	channelId: string,
	messageId: string,
	emoji: string,
) {
	return void (await rest.request(
		endpoints.createReaction(channelId, messageId, emoji),
		"PUT",
	));
}

export async function removeClientReaction(
	channelId: string,
	messageId: string,
	emoji: string,
) {
	return void (await rest.request(
		endpoints.deleteOwnReaction(channelId, messageId, emoji),
		"DELETE",
	));
}
export async function removeUserReaction(
	emoji: string,
	userId: Snowflake,
	channelId: Snowflake,
	messageId: Snowflake,
) {
	return void (await rest.request(
		endpoints.deleteUserReaction(channelId, messageId, emoji, userId),
		"DELETE",
	));
}
export async function getReactions(
	emoji: string,
	channelId: Snowflake,
	messageId: Snowflake,
) {
	return await rest.request(
		endpoints.getReactions(channelId, messageId, emoji),
		"GET",
	);
}
export async function deleteAllReactions(
	channelId: Snowflake,
	messageId: Snowflake,
) {
	return void (await rest.request(
		endpoints.deleteAllReactions(channelId, messageId),
		"DELETE",
	));
}

export async function deleteAllReactionsForEmoji(
	channelId: Snowflake,
	messageId: Snowflake,
	emoji: string,
) {
	return void (await rest.request(
		endpoints.deleteAllReactionsForEmoji(channelId, messageId, emoji),
		"DELETE",
	));
}
export async function sendTyping(channelId: Snowflake) {
	return void (await rest.request(
		endpoints.triggerTypingIndicator(channelId),
		"POST",
	));
}
export async function pinMessage(
	channelId: Snowflake,
	messageId: Snowflake,
	headers?: HeadersInit,
) {
	return void (await rest.request(
		endpoints.pinMessage(channelId, messageId),
		"PUT",
		undefined,
		headers,
	));
}
export async function unpinMessage(
	channelId: Snowflake,
	messageId: Snowflake,
	headers?: HeadersInit,
) {
	return void (await rest.request(
		endpoints.unpinMessage(channelId, messageId),
		"DELETE",
		undefined,
		headers,
	));
}
export async function startThreadFromMessage(
	channelId: Snowflake,
	messageId: Snowflake,
	headers?: HeadersInit,
) {
	return await rest.request(
		endpoints.startThreadFromMessage(channelId, messageId),
		"POST",
		undefined,
		headers,
	);
}

export async function createNewThread(
	channelId: Snowflake,
	headers?: HeadersInit,
) {
	return await rest.request(
		endpoints.startThreadWithoutMessage(channelId),
		"POST",
		undefined,
		headers,
	);
}
