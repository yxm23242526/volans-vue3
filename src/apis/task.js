import request from "@/utils/request";

/**
 * 获取任务列表
 * @returns {*}
 */
export const getTaskList = () => {
    return request({
        url: '/task/list',
    })
}

/**
 * 删除任务，会连带删除对应的周报，但是有已提交的周报就不能删除
 * @param taskId
 * @returns {*}
 */
export const deleteTask = (taskId) => {
    return  request({
        url: '/task/deleteTask/' + taskId,
        method: 'DELETE',
    })
}

/**
 * 新增任务，会创建对应的周报
 * @param date
 * @returns {*}
 */
export const addTask = (date) => {
    return  request({
        url: '/task/addTask',
        method: 'POST',
        data: date
    })
}

/**
 * 编辑任务时间范围
 * @param date
 * @returns {*}
 */
export const editTask = (date) => {
    console.log(date)
    return  request({
        url: '/task/editTask',
        method: 'POST',
        data: date
    })
}