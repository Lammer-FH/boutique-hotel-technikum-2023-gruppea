import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import BootstrapVue3 from 'bootstrap-vue-3'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// FontAwesome Importe
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faBath } from '@fortawesome/free-solid-svg-icons' // Importieren Sie die von Ihnen benötigten Icons

// Fügen Sie die Icons zur library hinzu
library.add(faUserSecret, faBath) // Fügen Sie weitere Icons hinzu, die Sie benötigen

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon) // FontAwesome-Komponente global registrieren

app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)

app.mount('#app')
