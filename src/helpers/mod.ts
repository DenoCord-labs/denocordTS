import { TimeStamps } from "../types/timestamp.ts";
import { Snowflake } from "../types/mod.ts";
export function time(timestamp: number, style?: keyof typeof TimeStamps) {
  return `<t:${timestamp}:${TimeStamps[style || "f"]}>`;
}

export function userMention(userId: number | string | Snowflake) {
  return `<@${userId}>`;
}
export function channelMention(channelId: number | string | Snowflake) {
  return `<#${channelId}>`;
}
export function roleMention(roleId: number | string | Snowflake) {
  return `<@&${roleId}>`;
}
