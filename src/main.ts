import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import './assets/css/index.less'
import { registerApp } from '@/global'
const app = createApp(App)
registerApp(app)
app.use(store).use(router).mount('#app')
