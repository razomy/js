export class SocketStore {
  ctx: razomy = undefined as any as razomy;

  on(key: string, cb: any) {
    const webSocket = this.ctx.webSocket;
    webSocket.on(key, cb);
  }

  off(key: string, cb: any) {
    const webSocket = this.ctx.webSocket;
    webSocket.on(key, cb);
  }
}
