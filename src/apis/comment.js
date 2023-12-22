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
export const getAllCommentsAPI = () => {
    return request({
        url: '/comment/getAllComments',
        method: 'GET',
    })
}
export const insertCommentAPI = (data) => {
    return request({
        url: '/comment/addComment',
        method: 'POST',
        data
    })
}