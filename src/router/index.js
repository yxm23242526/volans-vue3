/**
 * @Description: 路由相关封装类
 * @Author: yxm
 * @Date: 2023-11-22
 */
import { createRouter, createWebHistory } from "vue-router";
import { useTagsViewStore } from "@/stores/tags";
import pinia from '@/stores/index';
import { Session } from '@/utils/storage';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/layout/index.vue'),
            redirect: '/home',
            meta: {
                name: "首页",
                icon: "House",
                roles: ['admin', 'common'],
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/layout/home/index.vue'),
                    meta: {
                        name: "首页",
                        icon: "House",
                        roles: ['admin', 'common'],
                    }
                }, 
                {
                    path: '/weekreport',
                    redirect: '/edit',
                    meta: {
                        name: "周报管理",
                        icon: "Notification",
                        roles: ['admin', 'common'],
                    },
                    children: [
                        {
                            path: '/:id',
                            name: 'edit',
                            ishide: true,
                            component: () => import('@/views/weekreport/components/edit.vue'),
                            meta: {
                                name: "编辑周报",
                                icon: "Edit",
                                roles: ['admin', 'common'],
                            },
                        },
                        {
                            path: '/calculate',
                            name: 'calculate',
                            component: () => import('@/views/weekreport/components/calculate.vue'),
                            meta: {
                                name: "统计周报",
                                icon: "Histogram",
                                roles: ['admin'],
                            },
                        },
                        {
                            path: '/myWeekreport',
                            name: 'myWeekreport',
                            component: () => import('@/views/weekreport/components/myweekreport.vue'),
                            meta: {
                                name: "我的周报",
                                icon: "UserFilled",
                                roles: ['admin', 'common'],
                            }
                        },
                        {
                            path: '/TESTDEMO/:id',
                            name: 'TESTDEMO',
                            component: () => import('@/views/TESTDEMO/index.vue'),
                            meta: {
                                name: "测试专用",
                                icon: "SwitchFilled",
                                roles: ['admin', 'common'],
                            }
                        },
                    ]
                },
                {
                    path: '/chat',
                    name: 'chat',
                    component: () => import('@/views/chat/index.vue'),
                    meta: {
                        name: "素质广场",
                        icon: "ChatLineRound",
                        roles: ['admin', 'common'],
                    }
                },
                {
                    path: '/personal',
                    name: 'personal',
                    component: () => import('@/views/personal/index.vue'),
                    meta: {
                        name: "奇迹暖暖",
                        icon: "User",
                        roles: ['admin', 'common'],
                    }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            hide: true,
            component: () => import('@/views/login/index.vue'),
            meta: {
                roles: ['admin', 'common']
            }
        },

    ],
    // 路由滚动行为配置项   切换路由的时候回到顶部
    scrollBehavior() {
        return {
            top: 0
        }
    },
})

//假设通过接口从后台获取的用户角色，可以存储在token中
const role = 'admin';
const tagsviewStore = useTagsViewStore(pinia)
router.beforeEach((to,from,next)=>{
    // //验证token，只有存在token的时候，才能跳转到内容页
    let token = Session.get('token')
    // 这里逻辑不知道对不对
    if (to.path === '/login')
    {
        next()
    }
    else
    {
        if (token)
        {
            if (to.meta.roles.includes(role))
            {
                next()	//放行
            }
            else{
                next({path:"/404"})	//跳到404页面
            }
        }
        else
        {
            next('/login');
        }
    }
})

export default router