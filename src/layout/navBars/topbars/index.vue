<script setup>

import Settings from "@/layout/navBars/topbars/settings.vue";
import Breadcrumb from "@/layout/navBars/topbars/breadcrumb.vue";
import Helps from "@/layout/navBars/topbars/helps.vue";
import User from "./user.vue"
</script>

<template>
  <div class="layout-header-topbars">
    <Breadcrumb />
    <div class="layout-header-topbars-items">
      <!-- 右上角其他组件 -->
          <Helps />
          <Settings />
    </div>
    <User />
  </div>
</template>

<style scoped>
.layout-header-topbars-items{
  flex:1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
  height: inherit;
}
</style>