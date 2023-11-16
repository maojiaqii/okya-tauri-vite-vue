import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from './route'
import i18n from './modules/i18n'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/css-vars.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'
import './styles/index.scss'
import 'uno.css'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

const head = createHead()
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)
app.use(head)
app.use(router)
app.use(i18n).mount('#app')
