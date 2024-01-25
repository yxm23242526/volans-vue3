/**
 * @Description: 所有与用户相关的接口函数
 * @Author: yxm
 * @Date: 2023-11-22
 */
import request from '@/utils/request'

/**
 * 获取用户登录数据
 * @param userId 账号
 * @param password 密码
 * @returns 
 */
export const loginAPI = ({userId, password}) => {
    return request({
        url: '/user/login',
        method: 'POST',
        data: { //请求体参数
            userId,
            password
        }
    })
}

/**
 * 修改用户个人信息
 * @returns
 */
export const updateInfoAPI = (data) => {
    return request({
        url: '/user/updateInfo',
        method: 'POST',
        data
    })
}


/**
 * 刷新用户个人信息的API
 * @returns {*}
 */
export const refreshUserInfoAPI = () => {
    return request({
        url: '/user/refreshUserInfo',
    })
}

/**
 * 上传用户头像的API
 * @param data
 * @returns {*}
 */
export const uploadImageAPI = (data) => {
    return request({
        url: '/user/img',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}