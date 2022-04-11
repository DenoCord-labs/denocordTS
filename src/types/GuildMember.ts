import { User } from "./User.ts";
import { Role } from "./Role.ts";
export type GuildMember = {
  user: User;
  nick?: string;
  avatar?: string;
  roles: Role[];
  joined_at: string;
  premium_since?: string;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions: number;
  communication_disabled_until?: string;
};
