import {RemoteResource} from "razomy/vue/resource/remote_resource";
import {SocketStore} from "razomy/vue/resource/socket";

export interface Resource {
  store: RemoteResource;
  socket: SocketStore
}
