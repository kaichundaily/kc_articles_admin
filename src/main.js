import './assets/main.css'
import { createApp } from 'vue'
import pinia from "@/stores/index.js";

import App from './App.vue'
import router from './router'

import 'animate.css/animate.min.css'
import 'md-editor-v3/lib/style.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
