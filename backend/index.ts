import { TransportServer } from "ts-transport";
import express from "express";
import { createServer } from "http";
import { PORT } from "./conf";
import { userEvents } from "./socket-events";
import CreateUserSocketController from "./modules/auth/infra/controllers/create_user_socket_controller";
import LoginWithEmailCredentialsController from "./modules/auth/infra/controllers/login_with_email_credentials_socket_controller";
import { PostgresDataSource } from "./datasources";
const app = express();
const server = createServer(app);

const transport = new TransportServer({
  server: server,
});

transport.onConnect((client) => {
  client.on(userEvents.createUser.request, CreateUserSocketController.execute);
  client.on(
    userEvents.login.request,
    LoginWithEmailCredentialsController.execute
  );

  client.onClose(() => {
    client.off(
      userEvents.createUser.request,
      CreateUserSocketController.execute
    );
  });
});

PostgresDataSource.initialize();

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
