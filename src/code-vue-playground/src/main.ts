import { createApp } from 'vue'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const app = createApp(App)

// Register Vuetify as plugin
const vuetify = createVuetify()
app.use(vuetify as any).mount("#app")
