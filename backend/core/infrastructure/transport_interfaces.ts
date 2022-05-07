export interface ITransport {
  //The client list for the transport layer;
  config: TransportConfig;
  clients: ITransportClient[];
  onConnect(callback: (client: ITransportClient) => void): void;
}

export type TransportConfig = {
  port: number;
  insecureSocket: boolean;
};

export interface ITransportClient {
  readonly id: string;
  on(): void;
}
