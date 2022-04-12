import { Components } from "./ActionRow.ts";
import { GuildMember } from "./GuildMember.ts";
import { User } from "./User.ts";
import { Role } from "./Role.ts";
import { Message } from "./Message.ts";
import { Channel } from "./Channels.ts";

export type Interaction = {
  id: string;
  application_id: string;
  type: 1 | 2 | 3 | 4 | 5;
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
