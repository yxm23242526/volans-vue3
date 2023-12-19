/**
 * @Description: user相关的pinia管理
 * 一般约定的以use开头
 * 
 * @Author: yxm
 * @Date: 2023-11-22
 */

import { defineStore } from "pinia";
import { ref } from 'vue';
import { loginAPI, updateInfo } from '@/apis/user'
import { Session } from "@/utils/storage";
export const useUserStore = defineStore('user', () => {
    //1. 定义user的state管理
    const userInfo = ref({})
    //2. 定义user的action
    // 获得用户数据
    const getUserInfo = async ({userId, password}) => {
        const res = await loginAPI({userId, password})
        userInfo.value = res.data.user
        let token = res.data.token
        Session.set('token', token)
        Session.set('userInfo', userInfo.value)
        
    }
    // 清除用户数据
    const clearUserInfo = () => {
        userInfo.value = {}
        Session.remove('token')
        Session.remove('userInfo')
    }
    
    //修改用户数据
    const updateUserInfo = async(data) => {
        const res = await updateInfo(data)
        userInfo.value = res.data.user
        let token = res.data.token
        Session.remove('token')
        Session.remove('userInfo')
        Session.set('token', token)
        Session.set('userInfo', userInfo.value)
    }
    
    //3. 返回action
    return {
        userInfo,
        getUserInfo,
        updateUserInfo,
        clearUserInfo,
    }
})