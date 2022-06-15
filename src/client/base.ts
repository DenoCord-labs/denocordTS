import { Cache } from "../cache/mod.ts";
import {
  APIChannel,
  APIEmoji,
  APIGuildMember,
  APIRole,
  APIUser,
  ChannelType,
  ClientOptions,
  ClientUser,
  GatewayChannelPinsUpdateDispatchData,
  GatewayDispatchEvents,
  GatewayEvents,
  GatewayGuildBanAddDispatchData,
  GatewayGuildBanRemoveDispatchData,
  GatewayGuildMemberRemoveDispatchData,
  GatewayIdentifyData,
  GatewayIntentBits,
  GatewayInviteCreateDispatchData,
  GatewayInviteDeleteDispatchData,
  GatewayOpcodes,
  GatewayPresenceUpdateDispatchData,
  GatewayThreadMembersUpdateDispatchData,
  GatewayThreadMemberUpdateDispatchData,
  GatewayTypingStartDispatchData,
  GatewayWebhooksUpdateDispatchData,
  OPCodes,
} from "../types/mod.ts";
import {
  Camelize,
  camelize,
  EventEmitter,
  parse,
  stringify,
} from "../../deps.ts";
import { GatewayUrl } from "../constants/mod.ts";
import {
  ApplicationCommandInteraction,
  DmChannel,
  Guild,
  GuildEmoji,
  GuildMember,
  Message,
  Role,
  TextChannel,
  ThreadChannel,
  User,
} from "../structures/mod.ts";
import { handleCloseEventMessage } from "../handler/mod.ts";
import {
  GatewayReadyEventHandler,
  MessageCreateGatewayEventHandler,
} from "../events/mod.ts";

export class Base extends EventEmitter<GatewayEvents> {
  private heartbeatInterval = 41250;
  protected websocket: WebSocket;
  public user = {} as ClientUser;
  token = "";
  public readonly uptime = new Date().getTime();
  protected start: number = Date.now();
  protected options;
  cache = new Cache(this);
  ping = -1;
  constructor(options: ClientOptions) {
    super();
    this.options = options;
    this.token = options.token;
    this.websocket = new WebSocket(GatewayUrl);
    const payload: GatewayIdentifyData = {
      token: options.token,
      intents: options.intents.reduce(
        (bits, next) => (bits |= GatewayIntentBits[next]),
        0,
      ),
      properties: {
        $browser: "denocordts",
        $device: "denocordts",
        $os: Deno.build.os,
      },
    };
    this.websocket.onopen = async () => {
      await this.websocket.send(JSON.stringify({
        op: GatewayOpcodes.Identify,
        d: {
          ...payload,
        },
      }));
    };
    this.websocket.onerror = async (e) => {
      await this.emit("Error", e);
    };
    this.websocket.onmessage = async (e) => {
      const { d, op, t } = JSON.parse(e.data);

      switch (op) {
        case OPCodes.HELLO: {
          this.heartbeatInterval = d.heartbeat_interval;
          this.ping = Date.now() - this.start;
          this.sendHeartBeat();
          break;
        }
        case OPCodes.HEARTBEAT_ACK: {
          this.ping = Date.now() - this.start;
        }
      }
      switch (t) {
        case GatewayDispatchEvents.MessageCreate: {
          MessageCreateGatewayEventHandler(d, this);
          break;
        }
        case GatewayDispatchEvents.Ready: {
          GatewayReadyEventHandler(d, this);
          break;
        }
        case GatewayDispatchEvents.GuildCreate: {
          await this.cache.addGuildToCache(d.id, d);
          await this.addRolesToCache(d.roles, this.cache.guilds.get(d.id)!);
          await this.addEmojisToCache(d.emojis, d.id);
          await this.addChannelsToCache(d.channels);
          await this.addUsersToCache(
            d.members.map((member: APIGuildMember) => member.user),
          );
          d.members.forEach((member: APIGuildMember) =>
            this.cache.members.set(
              member.user!.id,
              new GuildMember({ member }, this, d.owner_id === member.user!.id),
            )
          );
          const length = this.cache.guilds.array().length;
          const guildsLength = parse(stringify(this.user)).guilds.length;

          if (length === guildsLength) {
            return this.emit("Ready", undefined);
          }
          if (length > guildsLength) {
            this.emit("GuildCreate", this.cache.guilds.get(d.id)!);
          }
          break;
        }
        case GatewayDispatchEvents.InteractionCreate: {
          switch (d.type) {
            case 3: {
              this.emit(
                "InteractionCreate",
                d,
              );
              break;
            }
            case 1:
              break;
            default: {
              this.emit(
                "CommandInteraction",
                new ApplicationCommandInteraction(d, this.options.token, this),
              );
            }
          }
          break;
        }
        case GatewayDispatchEvents.GuildMemberUpdate: {
          const owner =
            this.cache.guilds.get(d.guild_id)?.ownerId === d.user.id;
          const member = new GuildMember({ member: d }, this, owner);
          this.emit("GuildMemberUpdate", member);
          break;
        }
        case GatewayDispatchEvents.GuildRoleCreate: {
          if (d.role) {
            const role = new Role(d.role, this.cache.guilds.get(d.guild_id)!);
            this.cache.roles.set(d.role.id, role);
            this.emit("GuildRoleCreate", role);
          }
          break;
        }
        case GatewayDispatchEvents.GuildRoleDelete: {
          const role = this.cache.roles.get(d.role_id)!;
          this.emit("GuildRoleDelete", role);
          this.cache.roles.delete(d.role_id);
          break;
        }
        case GatewayDispatchEvents.GuildRoleUpdate: {
          if (d.role) {
            const role = new Role(d, this.cache.guilds.get(d.guild_id)!);
            this.cache.roles.set(d.role.id, role);
            this.emit("GuildRoleUpdate", role);
          }
          break;
        }
        case GatewayDispatchEvents.MessageDelete: {
          this.emit(
            "MessageDelete",
            {
              id: d.id,
              channelId: d.channelId,
              guildId: d.guildId,
            },
          );
          break;
        }
        case GatewayDispatchEvents.MessageUpdate: {
          this.emit("MessageUpdate", new Message(d, this));
          break;
        }
        case GatewayDispatchEvents.ChannelCreate: {
          const channel = this.addChannelsToCache([d]);
          this.emit("ChannelCreate", channel);
          break;
        }
        case GatewayDispatchEvents.ChannelUpdate: {
          const oldChannel = this.cache.getChannel(d.id);
          const newChannel = this.addChannelsToCache([d]);
          this.emit("ChannelUpdate", { oldChannel, newChannel });
          break;
        }
        case GatewayDispatchEvents.ChannelDelete: {
          const channel = this.cache.channels.get(d.id) ??
            this.addChannelsToCache([d]);
          this.cache.channels.delete(d.id);
          this.emit("ChannelDelete", channel);
          break;
        }
        case GatewayDispatchEvents.ChannelPinsUpdate: {
          this.emit(
            "ChannelPinsUpdate",
            camelize(d) as Camelize<GatewayChannelPinsUpdateDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.ThreadCreate:
          {
            const thread = new ThreadChannel(d, this);
            this.emit("ThreadCreate", thread);
          }
          break;
        case GatewayDispatchEvents.ThreadUpdate: {
          const oldThread = this.cache.channels.get(
            d.channel_id,
          ) as ThreadChannel;
          const newThread = this.addChannelsToCache([d]);
          this.emit("ThreadUpdate", { oldThread, newThread });
          break;
        }
        case GatewayDispatchEvents.ThreadDelete: {
          const thread = this.cache.channels.get(d.id) ??
            this.addChannelsToCache([d]);
          this.cache.channels.delete(d.id);
          this.emit("ChannelDelete", thread);
          break;
        }
        case GatewayDispatchEvents.MessageDeleteBulk: {
          this.emit("MessageDeleteBulk", {
            channelId: d.channel_id,
            guildId: d.guild_id,
            ids: d.ids,
          });
          break;
        }
        case GatewayDispatchEvents.PresenceUpdate: {
          this.emit(
            "PresenceUpdate",
            camelize(d) as Camelize<GatewayPresenceUpdateDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.InviteCreate: {
          this.emit(
            "InviteCreate",
            camelize(d) as Camelize<GatewayInviteCreateDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.InviteDelete: {
          this.emit(
            "InviteDelete",
            camelize(d) as Camelize<GatewayInviteDeleteDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.TypingStart: {
          this.emit(
            "TypingStart",
            camelize(d) as Camelize<GatewayTypingStartDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.GuildBanAdd: {
          this.cache.members.delete(d.user.id);
          this.emit(
            "GuildBanAdd",
            camelize(d) as Camelize<GatewayGuildBanAddDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.GuildBanRemove: {
          this.emit(
            "GuildBanRemove",
            camelize(d) as Camelize<GatewayGuildBanRemoveDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.ThreadMemberUpdate: {
          this.emit(
            "ThreadMemberUpdate",
            camelize(d) as Camelize<GatewayThreadMemberUpdateDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.ThreadMembersUpdate: {
          this.emit(
            "ThreadMembersUpdate",
            camelize(d) as Camelize<GatewayThreadMembersUpdateDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.GuildMemberAdd: {
          const isOwner =
            this.cache.guilds.get(d.guild_id)!.ownerId === d.member.user.id;
          const member = new GuildMember(d, this, isOwner);
          this.cache.members.set(d.member.user.id, member);
          this.emit("GuildMemberAdd", {
            member,
            guildId: d.guildId,
          });
          break;
        }
        case GatewayDispatchEvents.GuildMemberRemove: {
          this.cache.members.delete(d.user.id);
          this.emit(
            "GuildMemberRemove",
            camelize(d) as Camelize<GatewayGuildMemberRemoveDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.WebhooksUpdate: {
          this.emit(
            "WebhooksUpdate",
            camelize(d) as Camelize<GatewayWebhooksUpdateDispatchData>,
          );
          break;
        }
        case GatewayDispatchEvents.UserUpdate: {
          const user = new User(d, this);
          this.cache.users.set(user.id, user);
          this.emit("UserUpdate", user);
          break;
        }
      }
    };
    this.websocket.onclose = (e) => {
      console.log(e)
      handleCloseEventMessage(e.code);
    };
  }
  private sendHeartBeat() {
    setInterval(() => {
      this.start = Date.now();
      this.websocket.send(JSON.stringify({
        op: OPCodes.HEARTBEAT,
        d: null,
      }));
    }, this.heartbeatInterval);
  }

  private async addRolesToCache(roles: APIRole[], guild: Guild) {
    await Promise.all(
      roles.map((role) => {
        this.cache.addRoleToCache(role.id, new Role(role, guild));
      }),
    );
  }
  private async addEmojisToCache(emojis: APIEmoji[], guildId: string) {
    await Promise.all(
      emojis.map((emoji) => {
        this.cache.addEmojiToCache(
          emoji.id!,
          new GuildEmoji(emoji, this, guildId),
        );
      }),
    );
  }
  private async addUsersToCache(users: APIUser[]) {
    await Promise.all(
      users.map((user) => {
        this.cache.addUserToCache(user.id, new User(user, this));
      }),
    );
  }
  private addChannelsToCache(channels: APIChannel[]) {
    let channelValue: DmChannel | TextChannel | ThreadChannel;
    channels.map((channelPayload) => {
      switch (channelPayload.type) {
        case ChannelType.DM: {
          const channel = new DmChannel(channelPayload, this);
          this.cache.channels.set(
            channelPayload.id as string,
            channel,
          );
          channelValue = channel;
          break;
        }
        case ChannelType.GuildText: {
          const channel = new TextChannel(channelPayload, this);
          this.cache.channels.set(
            channelPayload.id as string,
            channel,
          );
          channelValue = channel;
          break;
        }
        case ChannelType.GuildPrivateThread: {
          const channel = new ThreadChannel(channelPayload, this);
          this.cache.channels.set(
            channelPayload.id as string,
            channel,
          );
          channelValue = channel;
          break;
        }
        case ChannelType.GuildPublicThread: {
          const channel = new ThreadChannel(channelPayload, this);
          this.cache.channels.set(
            channelPayload.id as string,
            channel,
          );
          channelValue = channel;
          break;
        }
      }
    });
    return channelValue!;
  }
}
