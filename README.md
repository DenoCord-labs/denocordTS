# DenoCordTS

An Object Oriented Discord Api Wrapper for Deno.

Basic Example:

```ts
import { Client } from "https://deno.land/x/denocordts/mod.ts";

const client = new Client({
	token: "...",
	clientId: "...",
	intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
});

client.on("Ready", () => console.log(`Logged in as ${client.user.username}`));

client.on("MessageCreate", async (m) => {
	if (m.content == "!ping") await m.reply({ content: "Pong" });
});
```
