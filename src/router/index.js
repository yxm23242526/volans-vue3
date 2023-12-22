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
                roles: [0, 1, 2],
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/layout/home/index.vue'),
                    meta: {
                        name: "首页",
                        icon: "House",
                        roles: [0, 1, 2],
                    }
                }, 
                {
                    path: '/weekreport',
                    redirect: '/edit',
                    meta: {
                        name: "周报管理",
                        icon: "Notification",
                        roles: [0, 1, 2],
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
                                roles: [0, 1, 2],
                            },
                        },
                        {
                            path: '/calculate',
                            name: 'calculate',
                            component: () => import('@/views/weekreport/components/calculate.vue'),
                            meta: {
                                name: "统计周报",
                                icon: "Histogram",
                                roles: [1, 2],
                            },
                        },
                        {
                            path: '/myWeekreport',
                            name: 'myWeekreport',
                            component: () => import('@/views/weekreport/components/myweekreport.vue'),
                            meta: {
                                name: "我的周报",
                                icon: "UserFilled",
                                roles: [0, 1, 2],
                            }
                        },
                        {
                            path: '/TESTDEMO/:id',
                            name: 'TESTDEMO',
                            component: () => import('@/views/TESTDEMO/index.vue'),
                            meta: {
                                name: "测试专用",
                                icon: "SwitchFilled",
                                roles: [0,1,2],
                            }
                        },
                    ]
                },
                {
                    path: '/chat',
                    name: 'chat',
                    component: () => import('@/views/chat/index.vue'),
                    meta: {
                        name: "意见板",
                        icon: "ChatLineRound",
                        roles:[0, 1, 2],
                    }
                },
                {
                    path: '/personal',
                    name: 'personal',
                    component: () => import('@/views/personal/index.vue'),
                    meta: {
                        name: "个人中心",
                        icon: "User",
                        roles:[0, 1, 2],
                    }
                },
                {
                    path: '/domain',
                    name: 'domain',
                    component: () => import('@/views/domain/index.vue'),
                    meta: {
                        name: "功能域",
                        icon: "MagicStick",
                        roles: [0, 1, 2],
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
                roles: [0, 1, 2]
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
            let userinfo = Session.get('userInfo')
            if (userinfo && to.meta.roles.includes(userinfo.identityId))
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