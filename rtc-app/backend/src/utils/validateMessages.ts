import { IncomingMessage, MessageType } from "../types";

export function validateMessage(message: IncomingMessage): boolean {
  return (
    typeof message === "object" &&
    typeof message.type === "string" &&
    ["create-room", "join-room", "chat"].includes(message.type)
  );
}
