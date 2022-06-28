import { TestClient } from "../src/client/test.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts"

Deno.test("Client Should Connect to Gateway", async() => {
    const client = new TestClient({
        clientId: Deno.env.get("CLIENTID")!,
        token: Deno.env.get("TOKEN")!,
        intents: ['Guilds']
    })
    await client.waitFor()
    client.on("Ready", (e) => {
        client.stopInterval()
        assertEquals(e, undefined)
    })
})