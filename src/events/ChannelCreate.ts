import { Base } from '../client/base.ts'
import { ChannelType } from '../../deps.ts'
import { DmChannel, TextChannel, ThreadChannel } from '../structures/mod.ts'
export function channelCreateEventHandler(channelPayload: Record<string, number | boolean | string>, client: Base) {
    switch (channelPayload.type) {
        case ChannelType.DM: {
            client.cache.channels.set(channelPayload.id as string, new DmChannel(channelPayload, client))
            break
        }
        case ChannelType.GuildText: {
            client.cache.channels.set(channelPayload.id as string, new TextChannel(channelPayload, client))
            break
        }
        case ChannelType.GuildPrivateThread: {
            client.cache.channels.set(channelPayload.id as string, new ThreadChannel(channelPayload, client))
            break
        }
        case ChannelType.GuildPublicThread: {
            client.cache.channels.set(channelPayload.id as string, new ThreadChannel(channelPayload, client))
            break
        }
        
    }

}