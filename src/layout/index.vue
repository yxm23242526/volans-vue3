<script setup>
import Header from '@/layout/components/header.vue'
import Navigation from '@/layout/components/navigation.vue'
import Body from '@/views/home/index.vue'
</script>

<template>
  <!-- 整体页面的布局在这里体现 -->
  <!-- 二级路由的入口一般定义在这里-->
  <!-- 且跳转至首页-->
  <Header/>
  <div class="content">
    <Navigation/>
    <RouterView/>
  </div>
</template>

<style scoped>
.content{
  display: flex;
}
</style>