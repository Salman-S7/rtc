import { ExtendedWebsocketType, RoomMap } from "../types";
import { generateRoomId } from "../utils/generateRoomId";

export function createRoom(socket: ExtendedWebsocketType, rooms: RoomMap) {
  const roomId = generateRoomId();

  rooms[roomId] = new Set([socket]);

  socket.roomId = roomId;

  socket.send(JSON.stringify({ type: "room-created", roomId }));
}
