import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
       '@razomy/hir-vue': path.resolve(__dirname, '../hir-vue/src/index.ts'),
    },
    dedupe: ['vue'],
  },
})
