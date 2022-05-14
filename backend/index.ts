import { TransportServer } from "./core/infrastructure/transport/transport_impl";

const server = new TransportServer({
  port: 4000,
  callback: () => console.log("Running in port 4000"),
});

server.onConnect((socket) => {
  socket.on("chat", () => {
    socket.join("chat");
    socket.emit("welcome", "welcome to the room");
    const messageBroadcaster = (data: any) => {
      console.log("message is here");
      socket.emit("sent", "your message was sent");
      socket.broadcast("message", data);
    };
    socket.on("chat-message", messageBroadcaster);
    socket.on("leave-chat", () => {
      socket.leave("chat");
      socket.off("message", messageBroadcaster);
    });
  });
});
