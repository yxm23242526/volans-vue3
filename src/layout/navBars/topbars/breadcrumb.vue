<script setup>
import { reactive, watch } from "vue";
import router from "@/router";

const levelList = reactive([]);
const createlevel = () => {
  levelList.length = 0;
  var routers = router.currentRoute.value.matched;
  routers.forEach(item => {
    if (item.path != "/") {
      levelList.push(item);
    }
  });
};

createlevel();
watch(() => router.currentRoute.value.path, () => {
  createlevel();
});
</script>

<template>
    <el-breadcrumb class="layout-navbars-breadcrumb ml15" separator="/">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to = "item.path">
        {{ item.meta.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
</template>
  

  
<style lang="scss" scoped>
.layout-navbars-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    opacity: 0.8;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
  