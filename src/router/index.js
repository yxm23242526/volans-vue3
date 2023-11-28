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
            path: '/',
            component: () => import('@/layout/index.vue'),
            redirect: '/main',
            meta:{
                name:"主页",
                icon:"House"
            },
            children:[
                {
                    path: '/main',
                    name: 'main',
                    component: () => import('@/views/main/MainVue.vue'),
                    meta:{
                        name:"主页",
                        icon:"House"
                    }
                }
            ]
        },
        {
            path: '/weekreport',
            component: () => import('@/layout/index.vue'),
            redirect: '/edit',
            meta:{
                name:"周报管理",
                icon:"Notification"
            },
            children:[
                {
                    path: '/edit',
                    name: 'edit',
                    component: () => import('@/views/main/WeekReportEdit.vue'),
                    meta:{
                        name:"编辑周报",
                        icon:"Edit"
                    },
                },
                {
                    path: '/example',
                    name: 'example',
                    component: () => import('@/views/main/MainVue.vue'),
                    meta:{
                        name:"统计周报",
                        icon:"Histogram"
                    },
                }

            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue'),
            hide:true
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