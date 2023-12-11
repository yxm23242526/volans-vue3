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