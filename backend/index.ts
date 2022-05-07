import SocketTransport from "./core/infrastructure/transport_impl";

const app = new SocketTransport({ port: 4000, insecureSocket: true });
