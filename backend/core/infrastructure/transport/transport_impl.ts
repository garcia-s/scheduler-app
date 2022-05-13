import { ITransportClient, ITransportServer } from "./transport_interfaces";
import { WebSocket, WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

type TrasportServerOptions = {
  port: number;
  callback?: () => void;
};

class TransportServer implements ITransportServer {
  private _server: WebSocketServer;
  private _connectListener?: (ws: TransportSocketClient) => void;
  private _closeListener?: () => void;
  private _errorListener?: (error: Error) => void;
  private _listeners = [];
  private _clients: TransportSocketClient[] = [];

  constructor(options: TrasportServerOptions) {
    this._server = new WebSocketServer(
      { port: options.port },
      options.callback
    );
    // Register connection listener
    this._server.on("connection", (ws: WebSocket) => {
      if (this._connectListener)
        this._connectListener(new TransportSocketClient(ws, this));
    });

    // Register error listener
    this._server.on("close", () => {
      if (this._closeListener) this._closeListener();
    });
    // Register error listener
    this._server.on("error", (error: Error) => {
      if (this._errorListener!) this._errorListener(error);
    });
  }
}

class TransportSocketClient implements ITransportClient {
  private _id = uuid();
  private _server: TransportServer;
  private _socket: WebSocket;
  private _listeners = [];

  constructor(ws: WebSocket, server: TransportServer) {
    this._socket = ws;
    this._server = server;

    //Register the listeners,
    this._socket.on("message", () => {});
  }
}
