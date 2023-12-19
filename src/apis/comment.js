/**
 * @Description: 评论留言
 * @Author: yxm
 * @Date: 2023-12-19
 */


import request from '@/utils/request'

/**
 * @description
 * @returns
 */
export const getAllComments = () => {
    return request({
        url: '/comment/getAllComments,',
        method: 'GET',
    })
}
export const insertComment = (data) => {
    return request({
        url: '/comment/addComment,',
        method: 'POST',
        data
    })
}