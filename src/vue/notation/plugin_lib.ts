import {directive} from "razomy.js/vue/notation/directive";
import {interpolateFactory} from "razomy.js/vue/notation/interpolate";

declare global {
  interface Window {
    rn: any;
  }
}

const plugin = {
  install(app, ctx) {
    app.razomy = app.razomy || {}
    app.razomy.notation = app.razomy.notation || {}
    app.config.globalProperties.rn = interpolateFactory(app.razomy.notation);
    window.rn = app.config.globalProperties.rn;
    app.directive('rn', directive)
    fetch(ctx.url + '/api/get', {method: 'GET'})
      .then(i => i.json())
      .then(data => {
        app.razomy.notation.data = data;
      });
  }
}

export const rnPlugin = plugin;