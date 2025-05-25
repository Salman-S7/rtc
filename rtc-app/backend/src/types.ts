import { WebSocket } from "ws";

export interface ExtendedWebsocketType extends WebSocket {
  roomId?: string;
}

export type MessageType = "join-room" | "create-room" | "chat";

export interface BaseMessage {
  type: MessageType;
}

export interface CreateRoomMessage extends BaseMessage {
  type: "create-room";
}

export interface JoinRoomMessage extends BaseMessage {
  type: "join-room";
  roomToJoin: string;
}

export interface ChatMessage extends BaseMessage {
  type: "chat";
  roomToChat: string;
  message: string;
}

export type IncomingMessage = CreateRoomMessage | JoinRoomMessage | ChatMessage;

export interface RoomMap {
  [roomId: string]: Set<WebSocket>;
}
