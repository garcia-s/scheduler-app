export interface ITransportServer {
  removeClient(client: ITransportClient): void;
  //Returns a list of the Transport clients
  get clients(): ITransportClient[];
  // Should register the connection listener in the transport implementation
  onConnect(listener: (socket: ITransportClient) => void): void;
  // Should register the error listener in the transport implementation
  onError(listener: (error: Error) => void): void;
  // Should register the close listener  in the transport implementation
  onClose(listener: () => void): void;
}

export enum TransportClientState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export interface ITransportClient {
  get rooms(): string[];
  
  get state(): TransportClientState;
  //Adds a listener to the list
  on(event: string, listener: (data: any) => void): void;
  //Removes a listener from the list
  off(event: string, listener: () => void): void;
  //Adds a self removing listener that executes only once
  once(event: string, listener: (data: any) => void): void;
  //emitted when the socket receives a close request
  onClose(listener: () => void): void;
  //emitted when an error has ocurred in the socket client
  onError(listener: (event: any) => void): void;
  //Sends an event to the client socket
  emit(event: string, data: any, onError?: (error: Error) => void): void;
  //Sends an event to all clients in the server;
  broadcast(event: string, data?: any): void;
  //Sends an event to all clients in a room
  emitToRoom(room: string, event: string, data?: any): void;
  //Enters a room
  join(room: string): void;
  //Leaves a room
  leave(room: string): void;
}
