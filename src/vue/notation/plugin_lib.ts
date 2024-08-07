import {directive} from "razomy.js/vue/notation/directive";
import notation_store from './notation_store';
import socket from './socket';
import {notation} from "razomy.js/vue/notation/notation";
import {WithWebsocket} from "razomy.js/socket/web/create";

declare global {
  interface razomy extends WithWebsocket {
    notation: notation;
    id: string;
    url: string;
  }

  interface Window {
    razomy: razomy;
  }

  interface Window {
    rn: (key: string) => string;
  }
}

const plugin = {
  install(app, ctx: razomy) {
    const razomy: razomy = {
      notation: {
        store: notation_store,
        socket: socket,
      },
      web_socket: ctx.web_socket,
      id: ctx.id,
      url: ctx.url
    }
    notation_store.ctx = razomy;
    socket.ctx = razomy;
    window.razomy = app.config.globalProperties.razomy = razomy;
    window.rn = razomy.notation.store.get;
    app.provide('razomy', razomy);
    app.directive('rn', directive)
  }
}

export const rnPlugin = plugin;