import { ChannelType } from "./Channels.ts";

type Locale =
  | "da"
  | "de"
  | "en-GB"
  | "en-US"
  | "es-ES"
  | "fr"
  | "hr"
  | "it"
  | "lt"
  | "hu"
  | "nl"
  | "no"
  | "pl"
  | "pt-BR"
  | "ro"
  | "fi"
  | "sv-SE"
  | "vi"
  | "tr"
  | "cs"
  | "el"
  | "bg"
  | "ru"
  | "uk"
  | "hi"
  | "th"
  | "zh-CN"
  | "ja"
  | "zh-TW"
  | "ko";

type LocalizationDict = {
  [key in Locale]: string;
};

export type ApplicationCommand = {
  id: number;
  type?: ApplicationCommandType;
  application_id: number;
  guild_id?: number;
  name: string;
  name_localizations?: LocalizationDict;
  description: string;
  description_localizations?: LocalizationDict;
  options?: ApplicationCommandOption[];
  default_permission?: boolean;
  version: number;
};

export enum ApplicationCommandType {
  "CHAT_INPUT" = 1,
  "USER" = 2,
  "MESSAGE" = 3
}

export type ApplicationCommandOption = {
  type: ApplicationCommandOptionType;
  name: string;
  name_localizations?: LocalizationDict;
  description: string;
  description_localizations?: LocalizationDict;
  required?: boolean;
  choices?: ApplicationCommandOptionChoice[];
  options?: ApplicationCommandOption[];
  channel_types?: ChannelType[];
  min_value?: number;
  max_value?: number;
  autocomplete?: boolean;
};

export enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11
}

export type ApplicationCommandOptionChoice = {
  name: string;
  name_localizations?: LocalizationDict;
  value: string | number;
};
