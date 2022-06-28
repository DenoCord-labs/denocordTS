import { ClientOptions } from "../types/clientoptions.ts";
import { OPCodes } from "../types/gateway.ts";
import { Client } from "./client.ts";

export class TestClient extends Client {
    private interval?: number;
    constructor(options: ClientOptions) {
        super(options);
    }
    protected sendHeartBeat(): void {
        this.interval = setInterval(() => {
            this.start = Date.now();
            this.websocket.send(JSON.stringify({
                op: OPCodes.HEARTBEAT,
                d: null,
            }));
        }, this.heartbeatInterval);
    }
    stopInterval() {
        if (this.interval) {
            this.websocket.close()
            clearInterval(this.interval);
        }
    }
    waitFor() {
        return new Promise((resolve, reject) => {
            this.websocket.addEventListener("open", () => {
                resolve(true)
            })
            this.websocket.addEventListener("error", () => {
                reject(false)
            })
        })
    }
}