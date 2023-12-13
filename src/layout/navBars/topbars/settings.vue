<!--
 * @Author: yxm
 * @Date: 2023-11-30 15:51:07
 * @Description: 
-->
<script setup>
import {useThemeConfigStore} from '@/stores/themeConfig';
import {computed, nextTick, onMounted} from 'vue'
import {Local} from '@/utils/storage'

const themeConfigStore = useThemeConfigStore();
const themeConfig = computed( () => {
  return themeConfigStore.themeConfig;
})


onMounted(() => {
  //初始化所有设置
  initSettings();
});

// 设置缓存数据
const initSettings = () => {
  //主题
  Local.set('themeConfig', themeConfig.value);
  //目前不提函数出来 需要用的参数比较少
  document.documentElement.style.setProperty('--vl-menu-bg-color', themeConfig.value.menuBar);
  document.documentElement.style.setProperty('--vl-menu-text-color', themeConfig.value.menuBarTextColor);
  document.documentElement.style.setProperty('--vl-menu-active-color', themeConfig.value.menuBarActiveColor);
}

</script>

<template>
  <div>
    <Icon name="Setting" :size="15"/>
  </div>
</template>


<style lang="scss" scoped>

</style>