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
        // params
    })
}

