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
      <div>
        <Helps />
      </div>
      <div>
        <Settings/>
      </div>
      <div>
        <User />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-header-topbars-items{
  >div{
    padding: 12px;
    &:hover:not(:last-child) {
      cursor: pointer;
      background: var(--vl-color-bars-hover);
      :deep(i){
        animation: logoAnimation 0.3s ease-in-out;
      }
    }
  }
}
</style>