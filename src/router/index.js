/**
 * @Description: 路由相关封装类
 * @Author: yxm
 * @Date: 2023-11-22
 */
import { createRouter, createWebHistory } from "vue-router";
import { Session } from '@/utils/storage';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

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
                    component: () => import('@/layout/home/index.vue'),
                    meta: {
                        name: "首页",
                        icon: "House",
                        roles: [0, 1, 2],
                    }
                }, 
                {
                    path: '/weekreport',
                    meta: {
                        name: "周报管理",
                        icon: "Notification",
                        roles: [0, 1, 2],
                    },
                    children: [
                        {
                            path: '/weekreport/edit/:id',
                            ishide: true,
                            component: () => import('@/views/weekreport/components/edit.vue'),
                            meta: {
                                name: "编辑周报",
                                icon: "Edit",
                                roles: [0, 1, 2],
                            },
                        },
                        {
                            path: '/weekreport/myWeekreport',
                            component: () => import('@/views/weekreport/myweekreport.vue'),
                            meta: {
                                name: "我的周报",
                                icon: "UserFilled",
                                roles: [0, 1, 2],
                            }
                        },
                        {
                            path: '/weekreport/calculate',
                            component: () => import('@/views/weekreport/calculate.vue'),
                            meta: {
                                name: "统计周报",
                                icon: "Histogram",
                                roles: [1, 2],
                            },
                        },
                        {
                            path: '/weekreport/query',
                            component: () => import('@/views/weekreport/query.vue'),
                            meta: {
                                name: "查询和修改",
                                icon: "Monitor",
                                roles: [1, 2],
                            },
                        },
                    ]
                },
                {
                    path: '/system',
                    meta: {
                        name: "系统管理",
                        icon: "Menu",
                        roles:[1, 2],
                    },
                    children: [
                        {
                            path: '/system/project',
                            component: () => import('@/views/system/project/index.vue'),
                            meta: {
                                name: "项目管理",
                                icon: "List",
                                roles: [1, 2],
                            }
                        },
                        {
                            path: '/system/role',
                            component: () => import('@/views/system/role/index.vue'),
                            meta: {
                                name: "角色管理",
                                icon: "UserFilled",
                                roles: [1, 2],
                            }
                        },
                    ]
                },
                {
                    path: '/weekreport/task',
                    component: () => import('@/views/task/taskManager.vue'),
                    meta: {
                        name: "任务管理",
                        icon: "Document",
                        roles: [1, 2],
                    }
                },
                {
                    path: '/comment',
                    component: () => import('@/views/comment/index.vue'),
                    meta: {
                        name: "意见板",
                        icon: "ChatLineRound",
                        roles:[0, 1, 2],
                    }
                },
                {
                    path: '/personal',
                    component: () => import('@/views/personal/index.vue'),
                    meta: {
                        name: "个人中心",
                        icon: "User",
                        roles:[0, 1, 2],
                    }
                },
                // {
                //     path: '/domain',
                //     component: () => import('@/views/domain/index.vue'),
                //     meta: {
                //         name: "功能域",
                //         icon: "MagicStick",
                //         roles: [0, 1, 2],
                //     }
                // },
                {
                    path: '/:pathMatch(.*)*',
                    name: 'notFound',
                    ishide: true,
                    component: () => import('@/views/error/404.vue'),
                    meta: {
                        roles: [0, 1, 2]
                    },
                },
            ]
        },
        {
            path: '/testdemo',
            name: 'test',
            hide: true,
            component: () => import('@/views/testdemo/index.vue'),
            meta: {
                roles: [0, 1, 2]
            }
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


router.beforeEach((to,from,next)=>{
    // //验证token，只有存在token的时候，才能跳转到内容页
    let token = Session.get('token')
    NProgress.configure({ showSpinner: false });//去掉圆圈
    NProgress.start();
    // 这里逻辑不知道对不对
    if (to.path === '/login' || to.path === '/TESTDEMO')
    {
        NProgress.done()
        next()
    }
    else
    {
        if (token)
        {
            let userinfo = Session.get('userInfo')
            if (userinfo === null)
            {
                Session.clear();
                next('/login');
                NProgress.done()
            }
            else if (userinfo && to.meta.roles.includes(userinfo.identityId))
            {
                next()	//放行
                NProgress.done()
            }
            else{
                next({path:"/404"})	//跳到404页面
            }
        }
        else
        {
            Session.clear();
            next('/login');
            NProgress.done()
        }
    }
})

// 路由加载后
router.afterEach(() => {
    NProgress.done();
});

export default router