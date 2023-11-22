/**
 * @Description: 路由相关封装类
 * @Author: yxm
 * @Date: 2023-11-22
 */

import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
        
        },
    ],
    // 路由滚动行为配置项   切换路由的时候回到顶部
    scrollBehavior(){
        return{
            top:0
        }
    }
})
export default router