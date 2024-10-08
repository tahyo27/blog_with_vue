import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia(); 

app.use(VueCookies);
app.use(pinia); 
app.use(router);
app.mount('#app');