import { CacheObject } from "../cache/mod.ts";
import {
	APIChannel,
	APIEmoji,
	APIRole,
	APIUser,
	GatewayDispatchEvents,
	GatewayIdentifyData,
	GatewayIntentBits,
	GatewayOpcodes,
	ChannelType
} from "../types/mod.ts";
import { Camelize, camelize, EventEmitter, parse, stringify } from "../../deps.ts";
import {
	APIMessage,
	ClientOptions,
	ClientUser,
	GatewayEvents,
	OPCodes,
	APIGuildMember
} from "../types/mod.ts";
import { GatewayUrl } from "../constants/mod.ts";
import { ApplicationCommandInteraction, TextChannel, DmChannel, ThreadChannel } from "../structures/mod.ts";
import { CloseEventHandler } from "../handler/mod.ts";
import {
	GatewayReadyEventHandler,
	MessageCreateGatewayEventHandler,
} from "../events/mod.ts";

export class Base extends EventEmitter<GatewayEvents> {
	public cache;
	private heartbeatInterval = 41250;
	protected websocket: WebSocket;
	public user = {} as ClientUser;
	token = "";
	public readonly uptime = new Date().getTime();
	protected start: number = Date.now();
	protected options;
	protected cachedInstance = new CacheObject(this);
	ping = -1;
	constructor(options: ClientOptions) {
		super();
		this.options = options;
		this.token = options.token;
		this.websocket = new WebSocket(GatewayUrl);
		this.cache = this.cachedInstance.cache;
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
					await this.cachedInstance.addGuildToCache(d.id, d);
					await this.addRolesToCache(d.roles);
					await this.addEmojisToCache(d.emojis)
					await this.addChannelsToCache(d.channels)
					await this.addUsersToCache(d.members.map((member: APIGuildMember) => member.user));
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
					console.log(d.type)
					switch (d.type) {
						case 3: {
							this.emit(
								"InteractionCreate",
								d
							);
							break
						}
						case 1: break
						default: {
							this.emit("CommandInteraction", new ApplicationCommandInteraction(d, this.options.token, this));

							break;
						}
					}
				}
				case GatewayDispatchEvents.GuildMemberUpdate: {
					break;
				}
				case GatewayDispatchEvents.GuildRoleCreate: {
					if (d.role) {
						this.cache.roles.set(
							d.role.id,
							camelize(d.role) as any,
						);
					}
					break;
				}
				case GatewayDispatchEvents.GuildRoleDelete: {
					this.cache.roles.delete(d.role_id);
					break;
				}
				case GatewayDispatchEvents.GuildRoleUpdate: {
					d.role &&
						d.role &&
						this.cache.roles.set(
							d.role.id,
							camelize(d.role) as any,
						);
					break;
				}
				case GatewayDispatchEvents.MessageDelete: {
					this.emit(
						"MessageDelete",
						camelize(d) as Camelize<APIMessage>,
					);
					break;
				}
				case GatewayDispatchEvents.ChannelCreate: {
					this.addChannelsToCache([d])
					break;
				}
			}
		};
		this.websocket.onclose = (e) => {
			new CloseEventHandler(e.code);
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

	private async addRolesToCache(roles: APIRole[]) {
		await Promise.all(
			roles.map(async (role) => {
				this.cachedInstance.addRoleToCache(role.id, role as any);
			}),
		);
	}
	private async addEmojisToCache(emojis: APIEmoji[]) {
		await Promise.all(
			emojis.map((emoji) => {
				this.cachedInstance.addEmojiToCache(emoji.id!, emoji as any);
			}),
		);
	}
	private async addUsersToCache(users: APIUser[]) {
		await Promise.all(
			users.map((user) => {
				this.cachedInstance.addUserToCache(user.id, user as any);
			}),
		);
	}
	private async addChannelsToCache(channels: APIChannel[]) {
		Deno.writeTextFileSync("channelsGateway.json", JSON.stringify(channels));
		for (let index = channels.length - 1; index >= 0; index--) {
			const channelPayload = channels[index]
			switch (channelPayload.type) {
				case ChannelType.DM: {
					await this.cache.channels.set(
						channelPayload.id as string,
						new DmChannel(channelPayload, this),
					);
					break;
				}
				case ChannelType.GuildText: {
					await this.cache.channels.set(
						channelPayload.id as string,
						new TextChannel(channelPayload, this),
					);
					break;
				}
				case ChannelType.GuildPrivateThread: {
					await this.cache.channels.set(
						channelPayload.id as string,
						new ThreadChannel(channelPayload, this),
					);
					break;
				}
				case ChannelType.GuildPublicThread: {
					await this.cache.channels.set(
						channelPayload.id as string,
						new ThreadChannel(channelPayload, this),
					);
					break;
				}
			}

		}
	}
}
