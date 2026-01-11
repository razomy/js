import {RemoteResource} from "razomy/vue/resource/remote_resource";
import {SocketStore} from "razomy/vue/resource/socket";

export interface resource {
  store: RemoteResource;
  socket: SocketStore
}
