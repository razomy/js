import {reactive_directive} from "razomy.js/vue/resource/reactive_directive";
import {RemoteResource} from 'razomy.js/vue/resource/remote_resource';
import {SocketStore} from 'razomy.js/vue/resource/socket';
import {resource} from "razomy.js/vue/resource/resource";
import {WithWebsocket} from "razomy.js/socket/web/create";
import {WithUrl} from "razomy.js/servers/server";

declare global {
  interface razomy extends WithWebsocket, WithUrl {
    id: string;
    resource: resource;
    r_g: (string: string) => string;
  }
}

export const razomy_resource_plugin = {
  install(app, ctx: razomy) {
    ctx.resource = {
      store: new RemoteResource(),
      socket: new SocketStore(),
    };
    ctx.resource.store.ctx = ctx;
    ctx.resource.socket.ctx = ctx;
    app.directive('r_r_r', reactive_directive);
    ctx.r_g = ctx.resource.store.get.bind(ctx.resource.store);
  }
}
