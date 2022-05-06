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
import { EventEmitter } from "../../deps.ts";
import {
	ClientOptions,
	ClientUser,
	GatewayEvents,
	OPCodes,
} from "../types/mod.ts";
import { GatewayUrl } from "../constants/mod.ts";
import { ClientMessage, Message } from "../structures/mod.ts";
import { CloseEventHandler } from "../handler/mod.ts";
export class Base extends EventEmitter<GatewayEvents> {
	private cacheInstance = new Cache();
	public cache;
	private heartbeatInterval = 41250;
	protected websocket: WebSocket;
	public user = {} as ClientUser;
	token: string = "";

	protected options;
	constructor(options: ClientOptions) {
		super();
		this.options = options;
		this.token = options.token;
		this.websocket = new WebSocket(GatewayUrl);
		this.cache = this.cacheInstance.cache;
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
			await this.websocket.send(
				JSON.stringify({
					op: GatewayOpcodes.Identify,
					d: {
						...payload,
					},
				}),
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
				{ op: OPCodes; d: any; t: GatewayDispatchEvents } = await JSON
					.parse(
						e.data,
					);

			switch (op) {
				case OPCodes.HELLO: {
					this.heartbeatInterval = d.heartbeat_interval;
					this.sendHeartBeat();
					break;
				}
			}
			switch (t) {
				case GatewayDispatchEvents.MessageCreate: {
					if (d.author.id === this.user.id) {
						this.emit(
							"MessageCreate",
							new ClientMessage(d, this.options.token),
						);
					} else {
						this.emit(
							"MessageCreate",
							new Message(d, this.options.token),
						);
					}
					break;
				}
				case GatewayDispatchEvents.Ready: {
					this.user = {
						...d.user,
						guilds: d.guilds.map(
							(g: { id: string; unavailable: boolean }) => g.id,
						),
					};
					break;
				}
				case GatewayDispatchEvents.GuildCreate: {
					this.cacheInstance.addGuildToCache(d.id, d);
					this.addChannelsToCache(d.channels);
					this.addRolesToCache(d.roles);
					this.addEmojisToCache(d.emojis);
					if (
						Object.keys(this.cacheInstance.cache.guilds).length ==
							this.user.guilds.length
					) {
						this.emit("Ready", undefined);
					}
					break;
				}
				case GatewayDispatchEvents.InteractionCreate: {
					this.emit("InteractionCreate", d);
					break;
				}
				case GatewayDispatchEvents.GuildMemberUpdate: {
				}
				case GatewayDispatchEvents.GuildRoleCreate: {
					if (d.role) {
						this.cacheInstance.cache.roles[d.role.id] = d;
					}
				}
				case GatewayDispatchEvents.GuildRoleDelete: {
					delete this.cacheInstance.cache.roles[d.role_id];
				}
				case GatewayDispatchEvents.GuildRoleUpdate: {
					d.role && (this.cacheInstance.cache.roles[d.role.id] = d);
				}
				case GatewayDispatchEvents.MessageDelete: {
					this.emit("MessageDelete", d);
				}
			}
			this.websocket.onclose = (e) => {
				new CloseEventHandler(e.code);
			};
		};
	}
	private sendHeartBeat() {
		setInterval(() => {
			this.websocket.send(
				JSON.stringify({
					op: OPCodes.HEARTBEAT,
					d: null,
				}),
			);
		}, this.heartbeatInterval);
	}
	private addChannelsToCache(channels: APIChannel[]) {
		Promise.all(
			channels.map((channel) => {
				this.cacheInstance.addChannelToCache(channel.id, channel);
			}),
		);
	}
	private addRolesToCache(roles: APIRole[]) {
		Promise.all(
			roles.map((role) => {
				this.cacheInstance.addRoleToCache(role.id, role);
			}),
		);
	}
	private addEmojisToCache(emojis: APIEmoji[]) {
		Promise.all(
			emojis.map((emoji) => {
				this.cacheInstance.addEmojiToCache(emoji.id!, emoji);
			}),
		);
	}
	private addUsersToCache(users: APIUser[]) {
		Promise.all(
			users.map((user) => {
				this.cacheInstance.addUserToCache(user.id, user);
			}),
		);
	}
}
