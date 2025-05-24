import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const clients = new Map();

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(message.toString());
  });

  socket.on("close", () => {
    console.log("Connection closed");
  });

  socket.on("error", (error) => {
    console.log("Something went wrong", error);
  });
});
