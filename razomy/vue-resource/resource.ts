import * as vueResource from "@razomy/vue-resource";

export interface Resource {
  store: vueResource.RemoteResource;
  socket: vueResource.SocketStore;
}
