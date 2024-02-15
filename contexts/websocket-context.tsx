import { createContext } from "react";
import { Socket } from "socket.io-client";
import { BarSquad } from "../controller/squad-session";

export type WebsocketContext = {
  client?: Socket;
  setClient(socket: Socket): void;
};

const websocketContext = createContext<WebsocketContext>({
  client: undefined,
  setClient: (socket?: Socket) => {
    throw new Error("Not implemented");
  },
});

export default websocketContext;
