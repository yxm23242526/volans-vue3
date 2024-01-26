<script setup>

</script>

<template>
<!--首页-->
    <el-main class="layout-main layout-main-h">
      <el-scrollbar class="layout-main-scroll"
                    wrap-class="layout-main-scroll"
                    view-class="layout-main-scroll">
        <div class="layout-parent">
          <router-view v-slot="{ Component }">
            <keep-alive include="query">
                <component :is="Component"  class="w100"/>
            </keep-alive>
          </router-view>
        </div>
      </el-scrollbar>
    </el-main>
<!--最主要展示的页面-->
</template>

<style scoped>
.layout-main-h{
  height: calc(100% - 85px);
  min-height: calc(100% - 85px);
}
</style>