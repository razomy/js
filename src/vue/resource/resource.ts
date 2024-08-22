import {RemoteResource} from "razomy.js/vue/resource/remote_resource";
import {SocketStore} from "razomy.js/vue/resource/socket";

export interface resource {
  store: RemoteResource;
  socket: SocketStore
}
