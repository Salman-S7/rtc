import { ExtendedWebsocketType, RoomMap } from "../types";

export function joinRoom(
  socket: ExtendedWebsocketType,
  rooms: RoomMap,
  roomToJoin: string
) {
  const room = rooms[roomToJoin];

  if (!room) {
    return socket.send(
      JSON.stringify({ type: "error", message: "Room not found" })
    );
  }

  if (room.size >= 2) {
    return socket.send(
      JSON.stringify({ type: "error", message: "Room is full." })
    );
  }

  room.add(socket);

  socket.roomId = roomToJoin;
  socket.send(JSON.stringify({ type: "joined-room", roomId: roomToJoin }));
  
}
