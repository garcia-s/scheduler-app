import { TransportServer } from "ts-transport";
import express from "express";
import { createServer } from "http";
import { PORT } from "./conf";
import { userEvents } from "./socket-events";
import CreateUserSocketController from "./modules/auth/infra/controllers/create_user_socket_controller";
const app = express();
const server = createServer(app);

const transport = new TransportServer({
  server: server,
});

transport.onConnect((client) => {
  client.data = {
    nombre: 'admin',
    password: "admin",
  };
  client.on(userEvents.createUser.request, CreateUserSocketController.execute);
  client.onClose(() => {
    client.off(
      userEvents.createUser.request,
      CreateUserSocketController.execute
    );
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
