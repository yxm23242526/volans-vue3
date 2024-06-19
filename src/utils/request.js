/**
* @Description: axios基础封装
* @Author: yxm
* @Date: 2023-11-22
*/

import axios from 'axios'
import { ElMessage } from "element-plus";
import router from '@/router' // vue3中 useRouter不允许在setup之外使用
import { Session } from '@/utils/storage';

const request = axios.create({
    // baseURL: 'http://127.0.0.1:4523/m1/3562468-0-default',
    // baseURL: 'http://localhost:10001',
    baseURL: 'http://10.0.1.201:10001',
    timeout: 5000
})
// axios拦截器
request.interceptors.request.use( config => {
    //1. 获取token数据
    const token = Session.get('token')
    if (token){
        config.headers.Authorization = `Bearer ${token}`
        config.headers.token = `Bearer ${token}`  //格式固定
    }
    //2. 安装后端要求拼接token数据
    return config
}, e => Promise.reject(e))

//axios响应式拦截器
request.interceptors.response.use( res => res.data, e => {
    if (e.response.status === 401)
    {
        Session.clear();
        router.push('/login');
        ElMessage({
            type: 'warning', message: '身份信息过期，请重新登陆'//e.response.data.message
        })
    }
    else
    {
        //统一错误提示
        ElMessage({
            type: 'warning', message: 'ERROR'//e.response.data.message
        })
    }
    return Promise.reject(e)
})
export default request