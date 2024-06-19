/**
 * @Description: markdown
 * @Author: yxm
 * @Date: 2024-06-19
 */

import request from '@/utils/request'


/**
 * 上传markdown图片
 * @param data
 * @returns {*}
 */
export const uploadMDAPI = (data) => {
    return request({
        url: '/file/uploadImage',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}