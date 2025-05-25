import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const rooms = new Map<string, WebSocket[]>();

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const data = JSON.parse(message.toString());

    switch (data.type) {
      case "create-room":
        const roomId = createRandomRoomId();
        rooms.set(roomId, [socket]);
        socket.send(
          JSON.stringify({
            message: "room created succesfully",
            roomId: roomId,
          })
        );
        break;
      case "join-room":
        const { roomToJoin } = data;

        if (rooms.has(roomToJoin)) {
          if (rooms.get(roomToJoin)?.length === 2) {
            socket.send(
              JSON.stringify({
                message: "That room is already filled try another one.",
              })
            );
          } else {
            // @ts-ignore
            rooms.get(roomToJoin)[1] = socket;
          }
        } else {
          socket.send(JSON.stringify({ message: "Given room does't exists" }));
        }
        break;
      case "chat":
        const { roomToChat } = data;

        if (rooms.has(roomToChat)) {
          rooms.get(roomToChat)?.forEach((s) => {
            s.send(JSON.stringify({ messageRecieved: data.message }));
          });
        } else {
          socket.send(JSON.stringify({ message: "Given room does't exists" }));
        }
        break;
    }
  });

  socket.on("close", (socket) => {
    console.log("Connection closed");
  });

  socket.on("error", (error) => {
    console.log("Something went wrong", error);
  });
});

function createRandomRoomId() {
  return Math.random().toString(36).substring(2, 5);
}
