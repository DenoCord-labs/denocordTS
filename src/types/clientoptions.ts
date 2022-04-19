import { GatewayIntentBits } from "../../deps.ts";
export type ClientOptions = {
  token: string;
  clientId: string;
  intents: (keyof typeof GatewayIntentBits)[];
};
