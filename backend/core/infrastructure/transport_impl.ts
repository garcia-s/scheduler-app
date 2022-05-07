import {
  ITransport,
  ITransportClient,
  TransportConfig,
} from "./transport_interfaces";
import { v4 as uuid } from "uuid";

import WebSocket, { WebSocketServer } from "ws";

class SocketTransport implements ITransport {
  config: TransportConfig;
  private _socket: WebSocketServer | null = null;
  clients: SocketTransportClient[] = [];

  constructor(config: TransportConfig = { port: 443, insecureSocket: true }) {
    this.config = config;
    this._socket = new WebSocketServer({
      port: config.port,
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024,
          memLevel: 7,
          level: 3,
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024,
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024, // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
      },
    });
  }
  onConnect(callback: (client: SocketTransportClient) => void): void {}

  on(event: string, callback: (ws: WebSocket, ...arg: any[]) => void) {
    this._socket!.on(event, callback);
  }
}

class SocketTransportClient implements ITransportClient {
  readonly id: string;

  constructor() {
    this.id = uuid();
  }

  on(): void {}
}

export default SocketTransport;
