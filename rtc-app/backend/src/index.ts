import { WebSocketServer } from "ws";
import { ExtendedWebsocketType, IncomingMessage, RoomMap } from "./types";
import { createRoom } from "./handlers/createRoom";
import { validateMessage } from "./utils/validateMessages";
import { joinRoom } from "./handlers/joinRoom";
import { handleChat } from "./handlers/handleChat";

const wss = new WebSocketServer({ port: 8080 });

const rooms: RoomMap = {};

wss.on("connection", (socket: ExtendedWebsocketType) => {
  socket.on("message", (data) => {
    let message: IncomingMessage;

    try {
      message = JSON.parse(data.toString());
    } catch (error) {
      return socket.send(
        JSON.stringify({ type: "error", message: "Invalid message" })
      );
    }

    if (!validateMessage(message)) {
      return socket.send(
        JSON.stringify({
          type: "error",
          message: "Invalid message strucutre",
        })
      );
    }

    switch (message.type) {
      case "create-room":
        createRoom(socket, rooms);
        break;
      case "join-room":
        const { roomToJoin } = message;

        joinRoom(socket, rooms, roomToJoin);

        break;
      case "chat":
        handleChat(socket, rooms, message.roomToChat, message.message);
        break;
    }
  });

  socket.on("close", () => {
    console.log("Connection closed");
    const roomId = socket.roomId;

    if (roomId && rooms[roomId]) {
      rooms.roomId.delete(socket);
      if (rooms[roomId].size === 0) {
        delete rooms[roomId];
      }
    }
  });

  socket.on("error", (error) => {
    console.log("Something went wrong", error);
  });
});
