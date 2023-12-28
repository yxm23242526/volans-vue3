/**
 * @Description: 所有与项目名称管理的相关接口
 * @Author: yxm
 * @Date: 2023-12-27
 */

import request from "@/utils/request";

/**
 * 获取所有项目名称
 * @returns
 */
export const getProjectsAPI = () => {
    return request({
        url: '/project/list',
    })
}

/**
 * 删除项目、支持批量删除
 * @returns
 */
export const removeProjectAPI = (data) => {
    return request({
        url: '/project/removeProjects',
        method: 'POST',
        data
    })
}

/**
 * 添加项目、支持批量添加
 * @returns
 */
export const addProjectAPI = (data) => {
    return request({
        url: '/project/addProjects',
        method: 'POST',
        data
    })
}

/**
 * 修改项目、支持批量添加
 * @returns
 */
export const updateProjectAPI = (data) => {
    return request({
        url: '/project/updateProjects',
        method: 'POST',
        data
    })
}