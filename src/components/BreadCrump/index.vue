<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to = "item.path">
      {{ item.meta.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { reactive, watch } from "vue";
import router from "@/router";

const levelList = reactive([]);
const createlevel = () => {
  levelList.length = 0;
  var routers = router.currentRoute.value.matched;
  console.log(routers)
  routers.forEach(item => {
    if (item.path != "/") {
      levelList.push(item);
    }
  });

  routers.forEach(item => {
    console.log(item.meta.name)
  });
};

createlevel();
watch(() => router.currentRoute.value.path, () => {
  createlevel();
});


</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
