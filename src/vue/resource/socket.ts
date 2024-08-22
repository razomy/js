export class SocketStore {
  ctx: razomy = undefined as any as razomy;

  on(key: string, cb) {
    const web_socket = this.ctx.web_socket;
    web_socket.on(key, cb);
  }

  off(key: string, cb) {
    const web_socket = this.ctx.web_socket;
    web_socket.on(key, cb);
  }
}
