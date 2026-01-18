import {RemoteResource} from 'razomy.vue.resource';
import {SocketStore} from 'razomy.vue.resource';

export interface Resource {
  store: RemoteResource;
  socket: SocketStore
}
