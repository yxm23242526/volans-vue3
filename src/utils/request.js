/**
* @Description: axios基础封装
* @Author: yxm
* @Date: 2023-11-22
*/

import axios from 'axios'
import { ElMessage } from "element-plus";
import router from '@/router' // vue3中 useRouter不允许在setup之外使用

const request = axios.create({
    baseURL: 'http://127.0.0.1:4523/m1/3562468-0-default',
    timeout: 5000
})
// axios拦截器
request.interceptors.request.use( config => {
    return config
}, e => Promise.reject(e))

//axios响应式拦截器
request.interceptors.response.use( res => res.data, e => {
    console.log(e)
    //统一错误提示
    ElMessage({
        type: 'warning', message: 'ERROR'//e.response.data.message
    })
    return Promise.reject(e)
})
export default request