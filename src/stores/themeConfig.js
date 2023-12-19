/**
 * @Description: 主题相关的pinia管理
 *
 * @Author: yxm
 * @Date: 2023-11-29
 */
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useThemeConfigStore = defineStore('themeConfig', () => {
    //1. 定义theme
    const themeConfig = ref({
        /**
         * 全局主题
         */
        // 默认 primary 主题颜色
        primary: '#409eff',
        // 是否开启深色模式
        isDark: false,
        
        /**
         * 菜单设置
         */
        // 默认菜单导航背景颜色
        menuBar: '#f4f5f7',//'#545c64',
        // 默认菜单导航字体颜色
        menuBarTextColor: '#172b4d',//'#42526e',//'#eaeaea',
        // 默认菜单高亮背景色
        menuBarActiveColor: '#ebecf0',// 'rgba(0, 0, 0, 0.2)',
        
        /**
         *
         */
        // 是否开启菜单水平折叠效果
        isCollapse: false,
    })
    
    //2. 定义action
    const setThemeConfig = (data) => {
        themeConfig.value = data;
    }
    //3. 返回action
    return {
        themeConfig,
        setThemeConfig,
    }
})