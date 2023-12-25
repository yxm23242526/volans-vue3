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
    <LayoutAside />
    <el-container class="layout-container-view h100">
      <el-scrollbar>
        <LayoutHeader/>
        <LayoutMain/>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>


<style lang="scss" scoped>

</style>