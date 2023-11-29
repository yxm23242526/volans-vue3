/**
 * @Description: 路由相关封装类
 * @Author: yxm
 * @Date: 2023-11-22
 */
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/layout/index.vue'),
            redirect: '/home',
            meta: {
                name: "首页",
                icon: "House"
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/layout/home/index.vue'),
                    meta: {
                        name: "首页",
                        icon: "House"
                    }
                }, 
                {
                    path: '/weekreport',
                    redirect: '/edit',
                    meta: {
                        name: "周报管理",
                        icon: "Notification"
                    },
                    children: [
                        {
                            path: '/edit',
                            name: 'edit',
                            component: () => import('@/views/weekreport/components/edit.vue'),
                            meta: {
                                name: "编辑周报",
                                icon: "Edit"
                            },
                        },
                        {
                            path: '/calculate',
                            name: 'calculate',
                            component: () => import('@/views/weekreport/components/calculate.vue'),
                            meta: {
                                name: "统计周报",
                                icon: "Histogram"
                            },
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            hide: true,
            component: () => import('@/views/login/index.vue')
        },

    ],
    // 路由滚动行为配置项   切换路由的时候回到顶部
    scrollBehavior() {
        return {
            top: 0
        }
    }
})
export default router