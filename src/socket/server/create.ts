import {Server} from "socket.io";
import {WithServer} from "razomy.servers/server";

export interface WithWebsocket {
  web_socket: Server;
}

function create(ctx: WithServer) {
  return new Server(ctx.server);
}

export default create;
