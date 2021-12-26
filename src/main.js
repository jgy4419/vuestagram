import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;

import store from './store.js'
import './registerServiceWorker'

// .use(store)모든 컴포넌트들이 store.js안에 있는 데이터를 공유하도록 함.
// app.mount('#app')
app.use(store).mount('#app')
