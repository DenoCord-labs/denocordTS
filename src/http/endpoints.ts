import { RestClient } from "./rest.ts";
import { Snowflake } from "../types/mod.ts";
import type { ContextMenu, SlashCommand } from "../structures/mod.ts";
import { endpoints } from "../constants/endpoints/mod.ts";
import { token } from "../state.ts";

export async function registerGlobalSlashCommands(
  commands: (SlashCommand | ContextMenu)[],
  clientId: Snowflake,
  rest: RestClient,
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
  commands: (SlashCommand | ContextMenu)[],
  clientId: Snowflake,
  guildId: Snowflake,
  rest: RestClient,
) {
  await rest.request(
    endpoints.createGuildApplicationCommand(clientId, guildId),
    "PUT",
    commands.map((cmd) => cmd.toJSON()),
    undefined,
    false,
  );
}

rest:
RestClient;
export async function createMessage(
  channelId: Snowflake,
  body: unknown,
  rest: RestClient,
) {
  return await rest.request(endpoints.createMessage(channelId), "POST", body);
}

export async function deleteMessage(
  channelId: Snowflake,
  messageId: Snowflake,
  rest: RestClient,
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
  rest: RestClient,
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
  rest: RestClient,
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
  rest: RestClient,
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
  rest: RestClient,
) {
  return await rest.request(
    endpoints.getReactions(channelId, messageId, emoji),
    "GET",
  );
}
export async function deleteAllReactions(
  channelId: Snowflake,
  messageId: Snowflake,
  rest: RestClient,
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
  rest: RestClient,
) {
  return void (await rest.request(
    endpoints.deleteAllReactionsForEmoji(channelId, messageId, emoji),
    "DELETE",
  ));
}
export async function sendTyping(channelId: Snowflake, rest: RestClient) {
  return void (await rest.request(
    endpoints.triggerTypingIndicator(channelId),
    "POST",
  ));
}
export async function pinMessage(
  channelId: Snowflake,
  messageId: Snowflake,
  rest: RestClient,
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
  rest: RestClient,
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
  rest: RestClient,
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
  rest: RestClient,
  headers?: HeadersInit,
) {
  return await rest.request(
    endpoints.startThreadWithoutMessage(channelId),
    "POST",
    undefined,
    headers,
  );
}
