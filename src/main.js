import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import { componentPlugin } from "@/components";
import '@/themes/index.scss';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from '@/stores/index';

/** 应该使用utils/storage.js/Local
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//注册持久化插件 自动存入localstorage 
pinia.use(piniaPluginPersistedstate)*/
const app = createApp(App)

//导入elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//使用中文
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia).use(componentPlugin).use(router).mount('#app')

app.provide('version', 'volans.1.0.2')