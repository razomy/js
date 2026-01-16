import {Server} from 'socket.io';
import {WithServer} from 'razomy.server/server';

export interface WithWebsocket {
  web_socket: Server;
}

export function create(ctx: WithServer) {
  return new Server(ctx.server);
}


