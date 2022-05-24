import { CommandType } from "./mod.ts";
import { GuildMember, User } from "../../structures/mod.ts";
interface Interaction {
  id: string;
  applicationId: string;
  type: CommandType;
  data?: "";
  guildId?: string;
  channelId: string;
  member?: GuildMember;
  user?: User;
  token: string;
  version: 1;
  locale?: string;
  guildLocale?: string;
}

interface InteractionData {
  id: string;
  name: string;
  type: CommandType;
  resolvedData: "";
}
