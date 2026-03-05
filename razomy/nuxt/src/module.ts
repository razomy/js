import {addComponentsDir, addLayout, addPlugin, createResolver, defineNuxtModule} from '@nuxt/kit';
import {existsSync} from 'node:fs';

// Module options TypeScript interface definition
export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@razomy/nuxt',
    // configKey: 'myModule',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const {resolve} = createResolver(import.meta.url);

    {
      _nuxt.options.build.transpile.push(resolve('./runtime/components'));
      _nuxt.options.build.transpile.push(resolve('./runtime/apps'));
      _nuxt.options.build.transpile.push(resolve('./runtime/layouts'));
      _nuxt.options.build.transpile.push(resolve('./runtime/pages'));

      addComponentsDir({path: resolve('./runtime/components'), prefix: 'rzm', pathPrefix: false,});
      addComponentsDir({path: resolve('./runtime/apps'), prefix: 'rzm', pathPrefix: false,});
      addComponentsDir({path: resolve('./runtime/layouts'), prefix: 'rzm', pathPrefix: false,});
      addComponentsDir({path: resolve('./runtime/pages'), prefix: 'rzm', pathPrefix: false,});

      addLayout({
        src: resolve('./runtime/layouts/DefaultLayout.vue'),
        filename: 'DefaultLayout.vue',
      }, 'rzm-default-layout');
      addLayout({src: resolve('./runtime/layouts/EmptyLayout.vue'), filename: 'EmptyLayout.vue',}, 'rzm-empty-layout');
    }

    addPlugin(resolve('./runtime/plugin'));

    _nuxt.hook('app:resolve', (app) => {
      const userHasAppVue = existsSync(_nuxt.options.srcDir + '/app.vue')
      if (!userHasAppVue) {
        app.mainComponent = resolve('./runtime/apps/DefaultApp.vue')
      }

      const userHasErrorVue = existsSync(_nuxt.options.srcDir + '/error.vue')
      if (!userHasErrorVue) {
        app.errorComponent = resolve('./runtime/pages/DefaultError.vue')
      }

      if (!app.layouts.default) {
        // If not, assign our module's layout as the default
        app.layouts.default = {
          file: resolve('./runtime/layouts/DefaultLayout.vue'), name: 'rzm-default-layout'
        }
      }
    })

  },
});
