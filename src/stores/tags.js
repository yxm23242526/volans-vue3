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
        const index = tagsviewState.value.findIndex( (state) => item.path == state.key)
        if (index == -1)
        {
            tagsviewState.value.push({
                key: item.path,
                title: item.meta.name,
            })
        }
    }

    //删除状态
    const removeState = (removedPath) => {
        const index = tagsviewState.value.findIndex( (state) => removedPath == state.key)
        if (index != -1)
        {
            tagsviewState.value.splice(index, 1)
            console.log(tagsviewState.value[0])
            const newPath = index > 0  ?  tagsviewState.value[index - 1].key : '';
            router.push({path: newPath})
        }   
    }
    return {
        tagsviewState,
        addState,
        removeState
    }
})