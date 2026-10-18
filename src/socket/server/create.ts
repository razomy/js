import { Server } from 'socket.io';
import * as server from '@razomy/server';

export interface HasWebsocket {
  webSocket: Server;
}

export function create(ctx: server.HasServer) {
  return new Server(ctx.server);
}
