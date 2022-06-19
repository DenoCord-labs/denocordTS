import {  camelize } from "../../../../deps.ts"
import { APIModalSubmitInteraction, InteractionResponseType } from "../../../types/mod.ts";
import { Base } from "../../../client/base.ts"
export class ModalComponentInteraction {
    private closed = false
    constructor(
        private payload: APIModalSubmitInteraction,
        private client: Base,

    ) {
    }
    async closeModal() {
        if (this.closed) {
            throw new Error("Modal is Already Closed", {
                cause: new Error("Tried to close a modal that was already closed")
            })
        }
        await this.client.rest.request(
            `/interactions/${this.payload.id}/${this.payload.token}/callback`,
            "POST",
            {
                type: InteractionResponseType.DeferredMessageUpdate,
            },
        );
    }
    getModalValues() {
        return camelize(this.payload.data.components) as {
            type: number, components: [{
                value: string,
                type: number,
                customId: string
            }]
        }[]
    }
}