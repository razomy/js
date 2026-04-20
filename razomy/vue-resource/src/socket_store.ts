import {Razomy} from "@razomy/razomy";

export class SocketStore {
  ctx: Razomy = undefined as any as Razomy;

  on(key: string, cb: any) {
    const webSocket = this.ctx.webSocket;
    webSocket.on(key, cb);
  }

  off(key: string, cb: any) {
    const webSocket = this.ctx.webSocket;
    webSocket.on(key, cb);
  }
}
