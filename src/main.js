import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import { createPinia } from "pinia";
import { componentPlugin } from "@/components";
import '@/themes/index.scss';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const pinia = createPinia()

/** 应该使用utils/storage.js/Local
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//注册持久化插件 自动存入localstorage 
pinia.use(piniaPluginPersistedstate)*/
const app = createApp(App)

//导入elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia).use(componentPlugin).use(router).use(ElementPlus).mount('#app')