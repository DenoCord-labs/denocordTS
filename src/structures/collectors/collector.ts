import { Client } from "../../client/client.ts";
import { ButtonInteraction } from "./classes/Button.ts";
import { SelectMenuInteraction as SelectMenuInteraction } from "./classes/SelectMenu.ts";
export class ComponentCollector extends EventTarget {
  constructor(
    private client: Client,
    private channelId: string,
    disposeInterval?: number
  ) {
    super();
    this.client.on("InteractionCreate", (e) => {
      if (
        e.type == 3 &&
        e.channel_id == this.channelId &&
        e.data.component_type == 2
      ) {
        super.dispatchEvent(
          new CustomEvent("buttonInteraction", {
            detail: new ButtonInteraction(this.client, this.channelId, e),
          })
        );
      } else if (
        e.type == 3 &&
        e.channel_id == this.channelId &&
        e.data.component_type == 3
      ) {
        super.dispatchEvent(
          new CustomEvent("selectMenuInteraction", {
            detail: new SelectMenuInteraction(this.client, this.channelId, e),
          })
        );
      }
    });
    if (disposeInterval) {
      setTimeout(() => {
        this.dispose();
      }, disposeInterval);
    }
    super.removeEventListener("buttonInteraction", () => {});
  }
  dispose() {
    super.removeEventListener("buttonInteraction", () => {});

    super.removeEventListener("selectMenuInteraction", () => {});
  }
  waitForInteraction({
    type,
    listener,
  }: {
    type: "buttonInteraction" | "selectMenuInteraction";
    listener: (e: any) => any;
  }) {
    super.addEventListener(type, listener);
  }
}
