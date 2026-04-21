// @razomy/rala-vue/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'RazomyVueResource',
      // 1. Tell Vite to ONLY build ES Modules (Nuxt's preferred format)
      formats: ['es'],
      fileName: (format) => `razomy-vue-resource.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'vuetify', /^vuetify\/.*/],
      output: {
        // 2. Suppress the Mixed Exports warning
        exports: 'named',
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify'
        }
      }
    }
  }
})
