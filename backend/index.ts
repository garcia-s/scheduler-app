import { TransportServer } from "ts-transport";
import express from "express";
import { createServer } from "http";
import { PORT } from "./core/conf";
const app = express();
const server = createServer(app);

const transport = new TransportServer({
  server: server,
});

transport.onConnect((client) => {});
// USER ENTITY

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
