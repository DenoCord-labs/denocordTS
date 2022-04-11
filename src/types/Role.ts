export type Role = {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: Tags;
};

export type Tags = {
  bot_id?: string;
  integration_id?: string;
  premium_subscriber?: null;
};
