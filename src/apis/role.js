import request from '@/utils/request'

export const getAllActiveUserList = () => {
    return request({
        url: '/user/getAllActiveUserList',
        method: 'GET',
    })
}

export const deleteUser = (userId) => {
    return request({
        url: '/user/deleteUser/' + userId,
        method: 'DELETE',
    })
}

export const updateUser = (userInfo) => {
    return request({
        url: '/user/updateUser',
        method: 'POST',
        data: userInfo
    })
}

export const addUser = (userInfo) => {
    return request({
        url: '/user/addUser',
        method: 'POST',
        data: userInfo
    })
}