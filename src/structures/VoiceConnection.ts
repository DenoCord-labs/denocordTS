import { BaseClient } from "../client/BaseClient.ts";
import { randomBits } from "../helpers/random.ts";
import { WebSocketClient } from "../websocket.ts";
import { secretbox } from "https://unpkg.com/@evan/wasm@0.0.63/target/nacl/deno.js";
import { MAX_AUDIO_PACKET_LENGTH } from "../constants/index.ts";

export class VoiceConnection {
  private voiceWs?: WebSocketClient;
  private sessionId?: string;
  private port = -1;
  private hostname = "";
  private heartbeatInterval = 13750;
  private start = Date.now();
  ping = -1;
  private ssrc = 0;
  private sequence = randomBits(16);
  private timestamp = randomBits(32);
  private secretKey: number[] = [];
  private socket = Deno.listenDatagram({
    port: 0,
    hostname: "0.0.0.0",
    transport: "udp"
  });
  private server: Deno.NetAddr = {
    transport: "udp",
    hostname: "",
    port: 0
  };
  private connected = false;

  constructor(
    private guild_id: string,
    private channel_id: string,
    private client: BaseClient
  ) {
    client.websocket.send(
      JSON.stringify({
        op: 4,
        d: {
          guild_id: guild_id,
          channel_id: channel_id,
          self_mute: false,
          self_deaf: true
        }
      })
    );
    client.websocket.on("message", async (m) => {
      const { d, t } = await JSON.parse(m.data);
      if (t == "VOICE_STATE_UPDATE") {
        this.sessionId = d.session_id;
      }
      if (t == "VOICE_SERVER_UPDATE") {
        this.voiceWs = new WebSocketClient(`wss://${d.endpoint}?v=4`);
        this.voiceWs.send(
          JSON.stringify({
            op: 0,
            d: {
              server_id: this.guild_id,
              user_id: client.user.id,
              session_id: this.sessionId,
              token: d.token
            }
          })
        );
        this.voiceWs?.on("close", (e) => {
          console.error(e);
        });
        this.voiceWs.on("message", async (m) => {
          const { d, op } = JSON.parse(m.data);
          switch (op) {
            case 8: {
              this.heartbeatInterval = d.heartbeat_interval;
              this.sendPingPayload();
              break;
            }
            case 6: {
              this.ping = Date.now() - this.start;
              break;
            }
            case 2: {
              this.ssrc = d.ssrc;
              this.server = { hostname: d.ip, port: d.port, transport: "udp" };
              await this.ipDiscovery();
              await this.voiceWs?.send(
                JSON.stringify({
                  op: 1,
                  d: {
                    protocol: "udp",
                    data: {
                      address: this.hostname,
                      port: this.port,
                      mode: "xsalsa20_poly1305"
                    }
                  }
                })
              );
              break;
            }
            case 4: {
              this.secretKey = d.secret_key;
              this.connected = true;
            }
          }
        });
      }
    });
  }
  private sendPingPayload() {
    setInterval(async () => {
      this.start = Date.now();

      const payload = JSON.stringify({
        op: 3,
        d: Date.now()
      });
      await this.voiceWs?.send(payload);
    }, this.heartbeatInterval);
  }

  private async ipDiscovery() {
    const buf = new Uint8Array(70);

    const view = new DataView(buf.buffer);

    view.setUint16(0, 0x1, false);
    view.setUint16(2, 70, false);
    view.setUint32(4, this.ssrc, false);

    await this.socket.send(buf, this.server);
    const [recv] = await this.socket.receive();
    const recvView = new DataView(recv.buffer);
    this.port = recvView.getUint16(recv.byteLength - 2, false);
    this.hostname = new TextDecoder().decode(
      recv.subarray(1 + recv.indexOf(0, 3), recv.indexOf(0, 4))
    );
  }

  private waitToConnect() {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (this.connected) {
          clearInterval(interval);
          return resolve();
        }
      }, 5);
    });
  }

  async playAudio(audio: Uint8Array) {
    if (!this.connected) await this.waitToConnect();
    const buf = new Uint8Array(MAX_AUDIO_PACKET_LENGTH);

    const view = new DataView(buf.buffer);
    buf.set([0x80, 0x78], 0);
    view.setUint16(2, this.sequence, false);
    view.setUint32(4, this.timestamp, false);
    view.setUint32(8, this.ssrc, false);
    const nonce = buf.subarray(0, 12);
    const encryptedAudio = secretbox.seal(
      audio.subarray(0, 1276 * 3),
      this.secretKey,
      nonce
    );

    buf.set(encryptedAudio, 12);
    await this.voiceWs?.send(
      JSON.stringify({
        op: 5,
        d: {
          speaking: 5,
          delay: 0,
          ssrc: this.ssrc
        }
      })
    );

    this.socket.send(
      buf.subarray(0, audio.subarray(0, 1276 * 3).length + 12),
      this.server
    );
  }
}
