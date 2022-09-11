import { TransportServer } from "ts-transport";
import express from "express";
import { createServer } from "http";
import { PORT } from "./conf";
import { userEvents } from "./socket-events";
import { PostgresDataSource } from "./datasources";
import CreateUserSocketController from "./infrastructure/controllers/create_user_socket_controller";
import LoginWithEmailCredentialsController from "./infrastructure/controllers/login_with_email_credentials_socket_controller";
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
console.log("hello");
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
