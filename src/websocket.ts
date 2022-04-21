import { EventEmitter } from "../deps.ts";

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type Message = string | number | Record<string, unknown>;

type WebSocketEvents<T = Message> = {
	message: (message: MessageEvent<T>) => unknown;
	open: () => void;
	close: (message: CloseEvent) => unknown;
	error: (message: ErrorEvent) => unknown;
};

export class WebSocketClient {
	private ws: WebSocket;
	private open = false;
	private events = new EventEmitter<WebSocketEvents>();

	constructor(url: string) {
		this.ws = new WebSocket(url);
		this.ws.onmessage = (m) => {
			let data;
			try {
				data = JSON.parse(m.data);
			} catch (_) {
				data = m.data;
			}
			(m.data as Writeable<typeof m["data"]>) = data;
			this.events.emit("message", m);
		};
		this.ws.onopen = () => {
			this.events.emit("open");
		};
		this.ws.onclose = (e) => {
			this.events.emit("close", e);
			this.open = false;
		};
		this.ws.onerror = (e) => {
			this.events.emit("error", e as ErrorEvent);
		};
	}

	private waitToConnect() {
		return new Promise<void>((resolve, reject) => {
			if (this.open) return resolve();
			this.events.on("open", () => {
				this.open = true;
				resolve();
			});
			this.events.on("close", () => {
				this.open = false;
				reject(new Error("Couldn't connect to WebSocket server"));
			});
		});
	}

	async send(message: Message) {
		await this.waitToConnect();
		this.ws.send(JSON.stringify(message));
	}

	on<T = Message>(
		event: "message",
		listener: WebSocketEvents<T>["message"],
	): void;
	on(event: "close", listener: WebSocketEvents["close"]): void;
	on(event: "open", listener: WebSocketEvents["open"]): void;

	on(
		event: keyof WebSocketEvents,
		listener: WebSocketEvents[keyof WebSocketEvents],
	): void {
		this.events.on(event, listener);
	}

	close() {
		this.ws.close();
	}
}
