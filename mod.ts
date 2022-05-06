const _stringify = JSON.stringify;
JSON.stringify = (value, replacer) =>
  _stringify(value, (key, val) => {
    const value = typeof val === "bigint" ? `BigInt(${val.toString()}n)` : val;
    return replacer
      ? (replacer as (key: string, value: unknown) => string)(key, value)
      : value;
  }).replaceAll(/"BigInt\((\d+)n\)"/gi, "$1");

export * from "./src/client/client.ts";
export { ActivityType, PresenceUpdateStatus,ApplicationCommandOptionType } from "./src/types/mod.ts";
export type { APIMessageComponentSelectMenuInteraction } from "./src/types/mod.ts";
export {
  ActionRow,
  Button,
  ComponentCollector,
  Embed,
  SelectMenu,
  SlashCommand,
} from "./src/structures/mod.ts";
export type {
  ButtonInteraction,
  SelectMenuInteraction,
} from "./src/structures/mod.ts";
export { parseEmojiForComponents } from "./src/utils/mod.ts";
export * from "./src/helpers/mod.ts";
