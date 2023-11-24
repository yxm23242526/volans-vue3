import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { componentPlugin } from "@/components";
import '@/themes/index.scss';
const pinia = createPinia()
//注册持久化插件 自动存入localstorage
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia).use(componentPlugin).use(router).use(ElementPlus).mount('#app')