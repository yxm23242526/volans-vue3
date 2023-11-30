<script setup>
import { onMounted } from 'vue';
import { Local } from '@/utils/storage'
import { useThemeConfigStore } from './stores/themeConfig';
const themeConfigStore = useThemeConfigStore()
onMounted(() => {
		// 获取缓存中的主题配置
		if (Local.get('themeConfig')) {
			themeConfigStore.setThemeConfig(Local.get('themeConfig'));
		}
});
</script>

<template>
  <!-- 一级路由出口组件-->
  <router-view></router-view>
</template>

<style scoped>

</style>
