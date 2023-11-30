<script setup>
import { useThemeConfigStore } from '@/stores/themeConfig';
import { onMounted } from 'vue' 
import { Local } from '@/utils/storage'
const themeConfigStore = useThemeConfigStore();
const themeConfig = themeConfigStore.themeConfig;   

onMounted(() => {
    //初始化所有设置
    initSettings();
});

// 设置缓存数据
const initSettings = () => {
    //主题
    Local.set('themeConfig', themeConfig);
    const themeData = Local.get('themeConfig')
    //目前不提函数出来 需要用的参数比较少
    document.documentElement.style.setProperty('--el-menu-bg-color', themeData.menuBar);
    document.documentElement.style.setProperty('--el-menu-text-color', themeData.menuBarTextColor);
    document.documentElement.style.setProperty('--el-menu-active-color', themeData.menuBarActiveColor);
    document.documentElement.style.setProperty('--el-menu-hover-bg-color', themeData.menuBarHoverColor);
}


</script>

<template>
    <div>
        设置
    </div>
</template>


<style lang="scss" scoped>

</style>