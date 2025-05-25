import { ExtendedWebsocketType, RoomMap } from "../types";

export function handleChat(
  socket: ExtendedWebsocketType,
  rooms: RoomMap,
  roomToChat: string,
  message: string
) {
  const room = rooms[roomToChat];

  if (!room) {
    return socket.send(
      JSON.stringify({ type: "error", message: "Room not found." })
    );
  }

  room.forEach((s) => {
    s.send(
      JSON.stringify({
        type: "chat",
        message,
      })
    );
  });
}
