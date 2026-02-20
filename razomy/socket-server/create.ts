import {Server} from 'socket.io';
import type {WithServer} from '@razomy/server';

export interface WithWebsocket {
  webSocket: Server;
}

export function create(ctx: WithServer) {
  return new Server(ctx.server);
}


