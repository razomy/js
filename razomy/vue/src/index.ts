
import type {Razomy} from "@razomy/razomy";

declare global {
  interface Window {
    razomy: Razomy;
    r: Razomy;
  }
}
// @ts-ignore
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    razomy: Razomy;
    r: Razomy;
  }
}

// @ts-ignore
declare module 'vue' {
  interface GlobalComponents {}

  interface ComponentCustomProperties {
    razomy: Razomy;
    r: Razomy;
  }
}

export default {
  install(app, razomy: Razomy) {
    if(window){
      window.r = window.razomy = razomy;
    }
    app.config.globalProperties.razomy = razomy;
    app.provide('razomy', razomy);
    app.provide('r', razomy);
  },
};
