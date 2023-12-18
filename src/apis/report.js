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
        params: {
            model: params.model,
            projectId: params.projectId,
            userId: params.userId,
            startDate: params.date[0],
            endDate: params.date[1]
        }
    })
}

export const query = (params) => {
    return request({
        url: '/weekreport/export/query',
        params: {
            model: params.model,
            projectId: params.projectId,
            userId: params.userId,
            startDate: params.date[0],
            endDate: params.date[1]
        }
    })
}
