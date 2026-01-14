import {Server} from 'socket.io';
import {WithServer} from 'razomy.servers/server';

export interface WithWebsocket {
  web_socket: Server;
}

export default function create(ctx: WithServer) {
  return new Server(ctx.server);
}


