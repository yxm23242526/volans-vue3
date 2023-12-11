/**
 * @Description: tagsView标签卡管理
 * 
 * @Author: yxm
 * @Date: 2023-12-7
 */
import { defineStore } from "pinia";
import { ref } from 'vue'
import router from '@/router'
export const useTagsViewStore = defineStore('tagsView', () => {
    const tagsviewState = ref([])

    //添加状态
    const addState = (item) => {
        //  代表有这个路由就不添加了
        const index = tagsviewState.value.findIndex((state) => item.path == state.path)
        console.log(tagsviewState)
        if (index == -1) {
            tagsviewState.value.push({
                path: item.path,
                title: item.meta.name,
            })
        }
    }

    //删除状态
    const removeState = (removedPath, activePath) => {
        //至少保留一个
        if (tagsviewState.value.length <= 1) {
            return;
        }
        setTimeout(() => {
            const index = tagsviewState.value.findIndex((state) => removedPath == state.path)
            if (index != -1) {
                tagsviewState.value.splice(index, 1)
                if (removedPath == activePath)
                {
                    const newPath = index > 0 ? tagsviewState.value[index - 1].path : '';
                    gotoPage(newPath)
                }
            }
        }, 0)

    }

    //切换页面跳转
    const gotoPage = (newPath) => {
        router.push({ path: newPath })
    }

    return {
        tagsviewState,
        addState,
        removeState,
        gotoPage
    }
})