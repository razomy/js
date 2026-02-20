import type {RemoteResource, SocketStore} from '@razomy/vue-resource';

export interface Resource {
  store: RemoteResource;
  socket: SocketStore
}
