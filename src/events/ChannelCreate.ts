import { Base } from "../client/base.ts";
import { ChannelType } from "../../deps.ts";
import { DmChannel, TextChannel, ThreadChannel } from "../structures/mod.ts";
export async function channelCreateEventHandler(
  channelPayload: DmChannel | TextChannel | ThreadChannel,
  client: Base,
) {
  switch (channelPayload.type) {
    case ChannelType.DM: {
      await client.cache.channels.set(
        channelPayload.id as string,
        new DmChannel(channelPayload, client),
      );
      break;
    }
    case ChannelType.GuildText: {
      await client.cache.channels.set(
        channelPayload.id as string,
        new TextChannel(channelPayload, client),
      );
      break;
    }
    case ChannelType.GuildPrivateThread: {
      await client.cache.channels.set(
        channelPayload.id as string,
        new ThreadChannel(channelPayload, client),
      );
      break;
    }
    case ChannelType.GuildPublicThread: {
      await client.cache.channels.set(
        channelPayload.id as string,
        new ThreadChannel(channelPayload, client),
      );
      break;
    }
  }
}
