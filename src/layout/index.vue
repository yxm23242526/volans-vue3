<script setup>
import LayoutHeader from '@/layout/components/header.vue'
import LayoutAside from '@/layout/components/aside.vue'
import LayoutMain from '@/layout/components/main.vue'
</script>

<template>
	<!-- 整体页面的布局在这里体现 -->
	<!-- 二级路由的入口一般定义在这里-->
	<!-- 且跳转至首页-->
	<el-container class="layout-container">
		<LayoutAside class="sidebar-container" />

		<div class="main-container">
			<div class="fixed-header">
				<LayoutHeader />
			</div>
			<LayoutMain />
		</div>

		<!-- <el-container class="layout-container-view h100">
			<el-scrollbar class="layout-backtop">
				<LayoutHeader /> -->
				<!-- 这里应该是不需要二级路由 -->
				<!-- <LayoutMain />
			</el-scrollbar>
		</el-container> -->
	</el-container>
</template>


<style lang="scss" scoped>
@import "@/themes/mixin.scss";
@import "@/themes/variables.module.scss";

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>