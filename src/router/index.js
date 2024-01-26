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
                title: "首页",
                icon: "House",
                roles: [0, 1, 2],
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/layout/home/index.vue'),
                    meta: {
                        title: "首页",
                        icon: "House",
                        roles: [0, 1, 2],
                    }
                }, 
                {
                    path: '/weekreport',
                    name: 'weekreport',
                    meta: {
                        title: "周报管理",
                        icon: "Notification",
                        roles: [0, 1, 2],
                    },
                    children: [
                        {
                            path: '/weekreport/edit/:user/:id',
                            name: 'edit',
                            ishide: true,
                            component: () => import('@/views/weekreport/components/edit.vue'),
                            meta: {
                                title: "编辑周报",
                                icon: "Edit",
                                roles: [0, 1, 2],
                            },
                        },
                        {
                            path: '/weekreport/myWeekreport',
                            name:'myweekreport',
                            component: () => import('@/views/weekreport/myweekreport.vue'),
                            meta: {
                                title: "我的周报",
                                icon: "UserFilled",
                                roles: [0, 1, 2],
                            }
                        },
                        {
                            path: '/weekreport/calculate',
                            name:'calculate',
                            component: () => import('@/views/weekreport/calculate.vue'),
                            meta: {
                                title: "统计周报",
                                icon: "Histogram",
                                roles: [1, 2],
                            },
                        },
                        {
                            path: '/weekreport/query',
                            name: 'query',
                            component: () => import('@/views/weekreport/query.vue'),
                            meta: {
                                title: "查询和修改",
                                icon: "Monitor",
                                roles: [1, 2],
                            },
                        },
                    ]
                },
                {
                    path: '/system',
                    name:'system',
                    meta: {
                        title: "系统管理",
                        icon: "Menu",
                        roles:[1, 2],
                    },
                    children: [
                        {
                            path: '/system/project',
                            name:'project',
                            component: () => import('@/views/system/project/index.vue'),
                            meta: {
                                title: "项目管理",
                                icon: "List",
                                roles: [1, 2],
                            }
                        },
                        {
                            path: '/system/role',
                            name: 'role',
                            component: () => import('@/views/system/role/index.vue'),
                            meta: {
                                title: "角色管理",
                                icon: "UserFilled",
                                roles: [1, 2],
                            }
                        },
                    ]
                },
                {
                    path: '/weekreport/task',
                    name: 'task',
                    component: () => import('@/views/task/taskManager.vue'),
                    meta: {
                        title: "任务管理",
                        icon: "Document",
                        roles: [1, 2],
                    }
                },
                {
                    path: '/comment',
                    name: 'comment',
                    component: () => import('@/views/comment/index.vue'),
                    meta: {
                        title: "意见板",
                        icon: "ChatLineRound",
                        roles:[0, 1, 2],
                    }
                },
                {
                    path: '/personal',
                    name: 'personal',
                    component: () => import('@/views/personal/index.vue'),
                    meta: {
                        title: "个人中心",
                        icon: "User",
                        roles:[0, 1, 2],
                    }
                },
                {
                    path: '/updateLog',
                    name: 'updateLog',
                    component: () => import('@/views/updatelog/index.vue'),
                    meta: {
                        title: '更新日志',
                        icon: "Promotion",
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