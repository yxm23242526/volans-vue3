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
  </el-container>
</template>


<style lang="scss" scoped>

.fixed-header {
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>