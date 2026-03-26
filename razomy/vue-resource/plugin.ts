import * as vueResource from '@razomy/vue-resource';
import * as socketWeb from '@razomy/socket-web';
import * as server from '@razomy/server';

declare global {
  interface razomy extends socketWeb.WithWebsocket, server.WithUrl {
    id: string;
    resource: vueResource.Resource;
    rG: (string: string) => string;
  }
}

export const RAZOMY_RESOURCE_PLUGIN = {
  install(app, ctx: razomy) {
    ctx.resource = {
      store: new vueResource.RemoteResource(),
      socket: new vueResource.SocketStore(),
    };
    ctx.resource.store.ctx = ctx;
    ctx.resource.socket.ctx = ctx;
    app.directive('r_r_r', vueResource.REACTIVE_DIRECTIVE);
    ctx.rG = ctx.resource.store.get.bind(ctx.resource.store);
  },
};
