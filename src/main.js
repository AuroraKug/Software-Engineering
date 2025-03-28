import './assets/main.scss'

import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router/index.js"
import {createPinia} from "pinia"
import {createPersistedState} from 'pinia-persistedstate-plugin'

const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()
pinia.use(persist)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
