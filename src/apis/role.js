import request from '@/utils/request'

/**
 * 获取所有用户列表的API
 * @returns {*}
 */
export const getUserList = () => {
    return request({
        url: '/user/getUserList',
    })
}

/**
 * 获取所有活跃用户列表的API
 * @returns {*}
 */
export const getAllActiveUserList = () => {
    return request({
        url: '/user/getAllActiveUserList',
        method: 'GET',
    })
}

/**
 * 删除用户的API
 * @param userId
 * @returns {*}
 */
export const deleteUser = (userId) => {
    return request({
        url: '/user/deleteUser/' + userId,
        method: 'DELETE',
    })
}

/**
 * 修改用户信息的API
 * @param userInfo
 * @returns {*}
 */
export const updateUser = (userInfo) => {
    return request({
        url: '/user/updateUser',
        method: 'POST',
        data: userInfo
    })
}

/**
 * 新增用户的API
 * @param userInfo
 * @returns {*}
 */
export const addUser = (userInfo) => {
    return request({
        url: '/user/addUser',
        method: 'POST',
        data: userInfo
    })
}