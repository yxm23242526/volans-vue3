/**
 * @Description: user相关的pinia管理
 * 一般约定的以use开头
 * 
 * @Author: yxm
 * @Date: 2023-11-22
 */

import { defineStore } from "pinia";
import { ref } from 'vue';
import { loginAPI } from '@/apis/user'
export const useUserStore = defineStore('user', () => {
    //1. 定义user的state管理
    const userInfo = ref({})
    //2. 定义user的action
    // 获得用户数据
    const getUserInfo = async ({account, password}) => {
        const res = await loginAPI({account, password})
        userInfo.value = res.result
    }
    // 清除用户数据
    const clearUserInfo = () => {
        userInfo.value = {}
    }
    //3. 返回action
    return {
        userInfo,
        getUserInfo,
    }
}, {persist: true}) //持久化， 自动存入localstorage