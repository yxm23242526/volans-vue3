/**
 * @Description:全局化通用组件
 * components中的所有组件都进行注册 并作为插件使用
 * @Author: yxm
 * @Date: 2023-11-22
 */
import Icon from './Icon/icon.vue'
import NoticeBar from './noticeBar/index.vue'
import Comment from './comment/index.vue'
export const componentPlugin = {
    install(app) {
        app.component('Icon', Icon);
        app.component('NoticeBar', NoticeBar);
        app.component('Comment', Comment)
    }
}