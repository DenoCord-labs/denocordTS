import { Components } from "./ActionRow.ts";
import { GuildMember } from "./GuildMember.ts";
import { User } from "./User.ts";
import { Role } from "./Role.ts";
import { Message } from "./Message.ts";
import { Channel } from "./Channels.ts";

export type Interaction = {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: InteractionData;
  guild_id?: string;
  channel_id?: string;
  member?: GuildMember;
  user?: User;
  token: string;
  version: 1;
  message?: Message;
  locale?: string;
  guild_locale?: string;
};

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
  MODAL_SUBMIT = 5
}

export type InteractionData = {
  id: string;
  name: string;
  type: number;
  resolved?: ResolvedData;
  guild_id?: string;
  custom_id?: string;
  component_type: number;
  target_id?: string;
  components?: Components[];
};
export type ButtonInteraction = Interaction;
export type SelectMenuInteraction = Interaction & {
  values: string[];
};

export type ResolvedData = {
  users?: Map<User, User>;
  members?: Map<string, Partial<GuildMember>>;
  roles?: Map<Role, Role>;
  channels?: Map<string, Partial<Channel>>;
  messages?: Map<string, Partial<Message>>;
  attachments?: any;
};

export enum InteractionCallbackType {
  "PONG" = 1,
  "CHANNEL_MESSAGE_WITH_SOURCE" = 4,
  "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE" = 5,
  "DEFERRED_UPDATE_MESSAGE" = 6,
  "UPDATE_MESSAGE" = 7,
  "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT" = 8,
  "MODAL" = 9
}
