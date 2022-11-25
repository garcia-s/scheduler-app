import { TransportServer } from "ts-transport";
import express from "express";
import { createServer } from "http";
import { PORT } from "./conf";
import { userEvents } from "./socket-events";
import { PostgresDataSource } from "./datasources";
import CreateUserSocketController from "./controllers/create_admin_socket_controller";
import LoginWithEmailCredentialsController from "./controllers/login_with_email_credentials_socket_controller";
import { DomainEventEmitter } from "./core/interfaces/domain_event_emitter";
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
