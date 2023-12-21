/**
 * @Description: 编辑周报
 * @Author: zzh
 * @Date: 2023-12-7
 */
import request from '@/utils/request'

/**
 * @description 
 * @returns 
 */
export const getWeekreport = (datearr) => {
    return request({
        url: '/weekreport/getWeekreport',
        method: 'GET',
        params:{
            "userId" : datearr[0],
            "taskId" : datearr[1]
        }
    })
}

/**获取项目列表
 * @description 
 * @returns 
 */
export const getProject = () => {
    return request({
        url: '/project/list',
        method: 'GET',
    })
}



/**
 * 提交周报
 * @returns 
 */
export const submit = (tableData, status) => {
    return request({
        url: '/weekreport/submit',
        method: 'POST',
        data: { //请求体参数
            tableData,
            status
        }
    })
}

