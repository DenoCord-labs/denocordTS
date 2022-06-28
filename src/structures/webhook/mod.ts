import { APIWebhook, WebhookType } from "../../types/mod.ts"
import { User, Attachment } from "../mod.ts"
import { Base } from "../../client/base.ts"
import { endpoints } from "../../constants/endpoints/mod.ts"
export class Webhook {
    /**
     * The Id of the webhook
     */
    id: string
    /**
     * The type of ther webhook
     */
    type: keyof typeof WebhookType
    /**
     * The Guild Id this webhook is for, if any
     */
    guildId?: string | null
    /**
     * The Channel Id this webhook is for
     */
    channelId: string
    /**
     * The User this webhook was created By (not returned when getting a webhook with its token)
     * 
     */
    user?: User
    /**
     * The default name of the Webhook
     */
    name
    /**
     * The default user avatar hash of the webhook
     */
    avatar
    /**
     * The secure token of the webhook (returned for incoming webhooks)
     */
    token?: string
    /**
     * the bot/OAuth2 application that created this webhook
     */
    applicationId
    /**
     * The url used for executing the webhook (returned by the `webhooks` OAuth2 flow)
     */
    url?: string

    constructor(private webhook: APIWebhook, private client: Base) {
        this.id = webhook.id
        this.type = webhook.type === 1 ? "Incoming" : webhook.type === 2 ? "ChannelFollower" : "Application"
        this.guildId = webhook.guild_id
        this.channelId = webhook.channel_id
        if ("user" in webhook) {
            this.user = this.client.cache.users.get(webhook.user!.id)!
        }
        this.name = webhook.name
        this.avatar = webhook.avatar
        this.token = webhook.token
        this.applicationId = webhook.application_id
        this.url = webhook.url
    }
    async modify({ avatar, name, channelId, reason }: {
        /**
         * name of the webhook
         */
        name: string
        /**
         * Avatar of the Webhook
         */
        avatar: Attachment
        /**
         * The new channelId this webhook should be moved to
         */
        channelId?: string
        /**
         * Reason to update the webhook
         */
        reason?: string
    }) {
        const headers = new Headers()
        if (reason) headers.append("X-Audit-Log-Reason", reason)
        const data = await (await this.client.rest.request(endpoints.modifyWebhook(this.id), "PATCH", {
            attachments: avatar,
            name: name || this.name,
            channelId: channelId || this.channelId
        }, headers, undefined, true)).json()
        return new Webhook(data, this.client)
    }

    async delete(reason?: string) {
        const headers = new Headers()
        if (reason) headers.append("X-Audit-Log-Reason", reason)
        return void await this.client.rest.request(endpoints.deleteWebhook(this.id), "DELETE", undefined, headers)
    }
}