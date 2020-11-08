import { createApp } from 'vue';
import App from './App.vue'
// import router from './router/index'
import vuex from './store/index'

createApp(App).use(vuex).mount('#app')
