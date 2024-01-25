/**
 * @Description: 评论留言
 * @Author: yxm
 * @Date: 2023-12-19
 */


import request from '@/utils/request'

/**
 * @description 获取评论信息的API
 * @returns
 */
export const getAllCommentsAPI = () => {
    return request({
        url: '/comment/getAllComments',
        method: 'GET',
    })
}

/**
 * @description 提交评论的API
 * @param data
 * @returns {*}
 */
export const insertCommentAPI = (data) => {
    return request({
        url: '/comment/addComment',
        method: 'POST',
        data
    })
}