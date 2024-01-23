/**
 * @Description: 周报相关的接口函数
 * @Author: yxm
 * @Date: 2023-12-4
 */
import request from '@/utils/request'

/**
 * @description 获取用户历史周报数据
 * @returns 
 */
export const getWeekreportList = (params) => {
    return request({
        url: '/weekreport/getWeekreport',
        params
    })
}

export const getUserList = () => {
    return request({
        url: '/user/getUserList',
    })
}

export const getFieldList = () => {
    return request({
        url: '/weekreport/fieldList',
    })
}

export const exportResult = (params) => {
    return request({
        url: '/weekreport/export',
        method: 'POST',
        data: params
    })
}


export const exportUserResult = (params) => {
    return request({
        url: '/weekreport/exportUser/' + params,
        method: 'POST',
    })
}


export const query = (params) => {
    return request({
        url: '/weekreport/export/query',
        method: 'POST',
        data: params
    })
}

export const revokeWeekreport = (taskId) => {
    return request({
        url: '/weekreport/revokeWeekreport/' + taskId,
        method: 'POST',
    })
}


/**
 * 提交周报
 * @returns
 */
export const submit = (params) => {
    return request({
        url: '/weekreport/submit',
        method: 'POST',
        data: params
    })
}

export const getTaskList = () => {
    return request({
        url: '/task/list',
    })
}

export const deleteTask = (taskId) => {
    return  request({
        url: '/task/deleteTask/' + taskId,
        method: 'DELETE',
    })
}

export const addTask = (date) => {
    return  request({
        url: '/task/addTask',
        method: 'POST',
        data: date
    })
}

export const editTask = (date) => {
    console.log(date)
    return  request({
        url: '/task/editTask',
        method: 'POST',
        data: date
    })
}