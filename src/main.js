import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/common/iconfont/iconfont.css'
createApp(App).use(router).mount('#app')

import "@/qiankun/index.js"