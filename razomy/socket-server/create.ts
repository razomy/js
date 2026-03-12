import { Server } from 'socket.io';
import * as server from "@razomy/server";

export interface WithWebsocket {
  webSocket: Server;
}

export function create(ctx: server.WithServer) {
  return new Server(ctx.server);
}
