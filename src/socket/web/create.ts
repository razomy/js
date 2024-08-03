import {io, Socket} from "socket.io-client";

export interface WithWebsocket {
  web_socket: Socket;
}

export function create(ctx: any) {
  return io(ctx.url);
}
