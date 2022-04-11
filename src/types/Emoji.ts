import { Role } from "./Role.ts";
import { User } from "./User.ts";
export type Emoji = {
  id: string;
  name: string;
  roles?: Role;
  user?: User;
  required_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
};
