const _stringify = JSON.stringify
const stringify: typeof JSON.stringify = (obj, replacer, space) => _stringify(obj, (key, value) => {
  const newValue = typeof value === "bigint" ? Number(value) : value
  return replacer ? (replacer as CallableFunction)(key, newValue) : newValue
}, space)

JSON.stringify = stringify;

export * from "./src/client/client.ts";
export {
  ActivityType,
  ApplicationCommandOptionType,
  PresenceUpdateStatus,
} from "./src/types/mod.ts";
export type { APIMessageComponentSelectMenuInteraction } from "./src/types/mod.ts";
export {
  ActionRow,
  ApplicationCommandInteraction,
  Button,
  ContextMenu,
  DmChannel,
  Embed,
  Guild,
  GuildCategory,
  GuildEmoji,
  GuildMember,
  GuildNewsChannel,
  GuildSticker,
  Modal,
  Role,
  SelectMenu,
  SlashCommand,
  TextChannel,
  TextInput,
  ThreadChannel,
  User,
  Attachment
} from "./src/structures/mod.ts";
export { parseEmojiForComponents } from "./src/utils/mod.ts";
export * from "./src/helpers/mod.ts";
