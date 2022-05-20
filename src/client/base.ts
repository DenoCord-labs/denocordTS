import { Cache } from "../cache/mod.ts";
import {
	APIChannel,
	APIEmoji,
	APIRole,
	APIUser,
	GatewayDispatchEvents,
	GatewayIdentifyData,
	GatewayIntentBits,
	GatewayOpcodes,
} from "../types/mod.ts";
import { Camelize, camelize, EventEmitter } from "../../deps.ts";
import {
	APIMessage,
	ClientOptions,
	ClientUser,
	GatewayEvents,
	OPCodes,
} from "../types/mod.ts";
import { GatewayUrl } from "../constants/mod.ts";
import { ApplicationCommandInteraction, Message } from "../structures/mod.ts";
import { CloseEventHandler } from "../handler/mod.ts";
export class Base extends EventEmitter<GatewayEvents> {
	public cache;
	private heartbeatInterval = 41250;
	protected websocket: WebSocket;
	public user = {} as ClientUser;
	token = "";
	public readonly uptime = new Date().getTime();
	protected start: number = Date.now();
	protected options;
	ping = -1;
	constructor(options: ClientOptions) {
		super();
		this.options = options;
		this.token = options.token;
		this.websocket = new WebSocket(GatewayUrl);
		this.cache = Cache.cache;
		const payload: GatewayIdentifyData = {
			token: options.token,
			intents: options.intents.reduce(
				(bits, next) => (bits |= GatewayIntentBits[next]),
				0
			),
			properties: {
				$browser: "denocordts",
				$device: "denocordts",
				$os: Deno.build.os,
			},
		};
		this.websocket.onopen = async () => {
			await this.websocket.send(
				JSON.stringify({
					op: GatewayOpcodes.Identify,
					d: {
						...payload,
					},
				})
			);
		};
		this.websocket.onerror = async (e) => {
			await this.emit("Error", e);
		};
		this.websocket.onmessage = async (e) => {
			const {
				d,
				op,
				t,
			}: // deno-lint-ignore no-explicit-any
			{ op: OPCodes; d: any; t: GatewayDispatchEvents } =
				await JSON.parse(e.data);

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
					if (d.author.id !== this.user.id) {
						this.emit("MessageCreate", new Message(d, this));
					} else {
					}
					break;
				}
				case GatewayDispatchEvents.Ready: {
					this.user = {
						...d.user,
						guilds: d.guilds.map(
							(g: { id: string; unavailable: boolean }) => g.id
						),
					};
					break;
				}
				case GatewayDispatchEvents.GuildCreate: {
					Cache.addGuildToCache(d.id, d);
					this.addChannelsToCache(d.channels);
					this.addRolesToCache(d.roles);
					this.addEmojisToCache(d.emojis);
					if (this.cache.guilds.size == this.user.guilds.length) {
						this.emit("Ready", undefined);
					}
					break;
				}
				case GatewayDispatchEvents.InteractionCreate: {
					this.emit(
						"InteractionCreate",
						new ApplicationCommandInteraction(
							d,
							this.options.token,
							this
						) as any
					);

					break;
				}
				case GatewayDispatchEvents.GuildMemberUpdate: {
				}
				case GatewayDispatchEvents.GuildRoleCreate: {
					if (d.role) {
						Cache.cache.roles.set(
							d.role.id,
							camelize(d.role) as any
						);
					}
				}
				case GatewayDispatchEvents.GuildRoleDelete: {
					Cache.cache.roles.delete(d.role_id);
				}
				case GatewayDispatchEvents.GuildRoleUpdate: {
					d.role &&
						d.role &&
						Cache.cache.roles.set(
							d.role.id,
							camelize(d.role) as any
						);
				}
				case GatewayDispatchEvents.MessageDelete: {
					this.emit(
						"MessageDelete",
						camelize(d) as Camelize<APIMessage>
					);
				}
			}
			this.websocket.onclose = (e) => {
				new CloseEventHandler(e.code);
			};
		};
	}
	private sendHeartBeat() {
		setInterval(() => {
			this.start = Date.now();
			this.websocket.send(
				JSON.stringify({
					op: OPCodes.HEARTBEAT,
					d: null,
				})
			);
		}, this.heartbeatInterval);
	}
	private addChannelsToCache(channels: APIChannel[]) {
		Promise.all(
			channels.map((channel) => {
				Cache.addChannelToCache(channel.id, channel as any);
			})
		);
	}
	private addRolesToCache(roles: APIRole[]) {
		Promise.all(
			roles.map((role) => {
				Cache.addRoleToCache(role.id, role as any);
			})
		);
	}
	private addEmojisToCache(emojis: APIEmoji[]) {
		Promise.all(
			emojis.map((emoji) => {
				Cache.addEmojiToCache(emoji.id!, emoji as any);
			})
		);
	}
	private addUsersToCache(users: APIUser[]) {
		Promise.all(
			users.map((user) => {
				Cache.addUserToCache(user.id, user as any);
			})
		);
	}
}
