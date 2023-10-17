import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import RoomExtrasIcons from '@/components/RoomExtrasIcons.vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.component('RoomExtrasIcons', RoomExtrasIcons);
app.use(pinia)
app.use(router)
app.use(BootstrapVue3)
app.mount('#app')
