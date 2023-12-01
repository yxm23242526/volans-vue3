<script setup>
import { reactive } from "vue";
import router from "@/router";
import { RouterLink } from "vue-router";
import Asideitem from "./asideitem.vue";

const routers = reactive(router.options.routes);

let arrlist = reactive([]);

const resolveArr = () => {
  routers.forEach(routeritem => {
    if (!routeritem.ishide) {
      if (routeritem.path === "/") 
      {
        arrlist = routeritem.children;
      }
    }
  });
}
resolveArr();

</script>


<template>
 <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu  :unique-opened="false" mode="vertical">
        <template v-for="item in arrlist">

          <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path" >
            <template #title>
              <el-icon>
                <component :is="item.meta.icon" />
              </el-icon>
              {{ item.meta.name }}
            </template>
            <Asideitem :chil="item.children"  />
          </el-sub-menu>

          <template v-else>
            <el-menu-item :index="item.path">
              <RouterLink :to="item.path">
                <el-icon>
                  <component :is="item.meta.icon" />
                </el-icon>
                {{ item.meta.name }}
              </RouterLink>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>


<style>
</style>