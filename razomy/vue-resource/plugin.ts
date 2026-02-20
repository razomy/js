import type {Resource} from '@razomy/vue-resource';
import {reactiveDirective, RemoteResource, SocketStore} from '@razomy/vue-resource';
import type {WithWebsocket} from '@razomy/socket-web';
import type {WithUrl} from '@razomy/server';

declare global {
  interface razomy extends WithWebsocket, WithUrl {
    id: string;
    resource: Resource;
    rG: (string: string) => string;
  }
}

export const razomyResourcePlugin = {
  install(app, ctx: razomy) {
    ctx.resource = {
      store: new RemoteResource(),
      socket: new SocketStore(),
    };
    ctx.resource.store.ctx = ctx;
    ctx.resource.socket.ctx = ctx;
    app.directive('r_r_r', reactiveDirective);
    ctx.rG = ctx.resource.store.get.bind(ctx.resource.store);
  }
}
