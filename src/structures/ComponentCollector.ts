import EventEmitter from "https://deno.land/x/eventemitter@1.2.1/mod.ts";

import { CollectorEvents } from "../types/Collector.ts";
import { Client } from "../client/index.ts";
import {
  ButtonInteraction as ButtonInteractionClass,
  Payload,
} from "../classes/ButtonInteraction.ts";
import { SelectMenuInteraction } from "../classes/SelectMenuInteraction.ts";
export class ButtonInteractionCollector extends EventEmitter<
  CollectorEvents<Payload>
> {
  constructor(public readonly client: Client, private channelId: string) {
    super();
    this.listen();
  }
  listen() {
    this.client.events.on("componentInteraction", async (e) => {
      if (e.channel_id == this.channelId) {
        await this.emit("collected", new ButtonInteractionClass(e).generate());
      }
    });
  }
}

export class SelectMenuInteractionCollector extends EventEmitter<
  CollectorEvents<
    Payload & {
      data: { custom_id: string; values: string[]; component_type: number }[];
    }
  >
> {
  constructor(public readonly client: Client, public channelId: string) {
    super();
    this.listen();
  }
  listen() {
    this.client.events.on("componentInteraction", async (e) => {
      if (this.channelId == e.channel_id) {
        await this.emit("collected", new SelectMenuInteraction(e).generate());
      }
    });
  }
}
