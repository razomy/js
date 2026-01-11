declare global {
  interface Window {
    razomy: razomy;
    r: razomy;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    razomy: razomy;
    r: razomy;
  }
}

declare module 'vue' {
  interface GlobalComponents {
  }

  interface ComponentCustomProperties {
    razomy: razomy;
    r: razomy;
  }
}

export const plugin = {
  install(app, razomy: razomy) {
    window.r = window.razomy = app.config.globalProperties.razomy = razomy;
    app.provide('razomy', razomy);
    app.provide('r', razomy);
  }
}
