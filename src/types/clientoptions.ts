import { GatewayIntentBits } from "./mod.ts";
export type ClientOptions = {
  token: string;
  clientId: string;
  intents: (keyof typeof GatewayIntentBits)[];
  debug?: boolean
};
