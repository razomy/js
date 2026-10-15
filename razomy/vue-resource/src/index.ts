import "./extensions";

import { REACTIVE_DIRECTIVE } from './reactive_directive';
import { RemoteNode } from './remote_node';
import { RemoteResource } from './remote_resource';
import { SocketStore } from './socket_store';
import { type Resource } from './resource';
import * as razomy from '@razomy/abstractions/meta';



export {
  REACTIVE_DIRECTIVE,
  RemoteNode,
  RemoteResource,
  SocketStore,
  Resource
}

export default {
  install(app, ctx: razomy.Razomy) {
    ctx.resource = {
      store: new RemoteResource(),
      socket: new SocketStore(),
    };
    ctx.resource.store.ctx = ctx;
    ctx.resource.socket.ctx = ctx;
    app.directive('r_r_r', REACTIVE_DIRECTIVE);
    ctx.rG = ctx.resource.store.get.bind(ctx.resource.store);
  },
};
