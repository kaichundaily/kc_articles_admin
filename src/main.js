import './assets/main.css'
import { createApp } from 'vue'
import pinia from "@/stores/index.js";

import App from './App.vue'
import router from './router'

import 'animate.css/animate.min.css'
import 'md-editor-v3/lib/style.css'
import { routerStore } from "@/stores/index.js";

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
const rouStore = routerStore()
if (rouStore.routerList) {
    rouStore.routerList.forEach(item => router.addRoute("Layout", item))
}