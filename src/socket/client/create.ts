import { io, Socket } from 'socket.io-client';

export interface HasWebsocket {
  webSocket: Socket;
}

export function create(ctx: any) {
  return io(ctx.url);
}
