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

export const getProjectList = () => {
    return request({
        url: '/project/list',
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
        method: 'post',
    })
}
