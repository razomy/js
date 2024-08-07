function on(key: string, cb) {
  const web_socket = socket_store.ctx.web_socket;
  web_socket.on(key, cb);
}

function off(key: string, cb) {
  const web_socket = socket_store.ctx.web_socket;
  web_socket.on(key, cb);
}

const socket_store = {
  ctx: null as unknown as razomy,
  on,
  off,
};

export default socket_store;

