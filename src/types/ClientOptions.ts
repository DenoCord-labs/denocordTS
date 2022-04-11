import { GatewayIntents } from "./shared.ts";
export type ClientOptions = {
  token: string;
  clientId: string;
  intents: (keyof typeof GatewayIntents)[];
};
