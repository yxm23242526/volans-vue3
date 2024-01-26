/**
 * @Description: tagsView标签卡管理
 *
 * @Author: yxm
 * @Date: 2023-12-7
 */
import {defineStore} from "pinia";
import {ref} from 'vue'
import router from '@/router'
import {Session} from "@/utils/storage";

export const useTagsViewStore = defineStore('tagsView', () => {
    const tagsviewState = ref([])
    
    
    const initState = (route) => {
        const tagslist = Session.get('tagsView')
        if (!tagslist) {
            addState(route)
        } else {
            tagsviewState.value.push(...tagslist)
        }
    }
    
    //添加状态
    const addState = (item) => {
        //  代表有这个路由就不添加了
        const index = tagsviewState.value.findIndex((state) => item.path === state.path)
        if (index === -1) {
            if (item.name === 'edit') {
                const taskId = item.params.id;
                const userId = item.params.user;
                const res = Session.get('weekreport' + userId + taskId);
                const title = res.name;
                tagsviewState.value.push({
                    path: item.path,
                    title: title,
                })
            } else {
                tagsviewState.value.push({
                    path: item.path,
                    title: item.meta.title,
                })
            }
        }
        Session.set('tagsView', tagsviewState.value)
    }
    
    //删除状态
    const removeState = (removedPath, activePath) => {
        //至少保留一个
        if (tagsviewState.value.length <= 1) {
            return;
        }
        const index = tagsviewState.value.findIndex((state) => removedPath === state.path)
        if (index !== -1) {
            tagsviewState.value.splice(index, 1)
            if (removedPath === activePath) {
                const newPath = index > 0 ? tagsviewState.value[index - 1].path : '';
                gotoPage(newPath)
            }
        }
        Session.set('tagsView', tagsviewState.value)
    }
    
    //切换页面跳转
    const gotoPage = (newPath) => {
        router.push({path: newPath})
    }
    
    //删除并前往指定页面，如果没有则去往首页
    const removeAndGotoPage = (removedPath, gotoPath) => {
        const index = tagsviewState.value.findIndex((state) => removedPath === state.path)
        if (index !== -1) {
            tagsviewState.value.splice(index, 1)
            const goIndex = tagsviewState.value.findIndex((state) => gotoPath === state.path)
            if (goIndex !== -1) {
                gotoPage(gotoPath)
            }
            else {
                gotoPage('/home')
            }
        }
        Session.set('tagsView', tagsviewState.value)
    }
    
    const clearState = () => {
        tagsviewState.value = [];
    }
    return {
        tagsviewState,
        initState,
        addState,
        removeState,
        gotoPage,
        clearState,
        removeAndGotoPage,
    }
})