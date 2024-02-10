import { createApp } from 'vue'
import 'normalize.css'
import './style.css'
import 'primevue/resources/themes/md-light-indigo/theme.css';
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App)
    .use(PrimeVue)
    .use(pinia)
    .mount('#app')
