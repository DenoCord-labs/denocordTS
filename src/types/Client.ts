export type ClientUser = {
  verified: boolean;
  username: string;
  mfa_enabled: boolean;
  id: string;
  flags: number;
  email: null;
  discriminator: string;
  bot: boolean;
  avatar: string;
  guilds: string[];
};
