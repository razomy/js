import {RemoteResource} from "./remote_resource";
import {SocketStore} from "./socket_store";

export interface Resource {
  store: RemoteResource;
  socket: SocketStore;
}
