<!--
 * @Author: zzh
 * @Date: 2023-11-29
 * @Description: 侧边栏导航
-->


<script setup>
import {reactive, ref, watch, computed, onMounted} from "vue";
import Asideitem from "./asideitem.vue";
import { Session } from '@/utils/storage';
import {useRouter, useRoute} from "vue-router";
import {useThemeConfigStore} from "@/stores/themeConfig";

const themeConfigStore = useThemeConfigStore()
const themeConfig = computed(() => {
  return themeConfigStore.themeConfig
})
const router = useRouter();
const route = useRoute();
const routers = reactive(router.options.routes);
const level= ref(0);

const asideState = ref({
  isCollapse: false,
})

onMounted( () => {
  level.value = Session.get('userInfo').identityId;
})

//监听左侧是否折叠
watch(() => themeConfig.value?.isCollapse,
    (isCollapse) => {
      asideState.value.isCollapse = isCollapse
},{
  immediate: true,
    })

let arrlist = reactive([]);

const resolveArr = () => {
  routers.forEach(routeritem => {
    if (!routeritem.ishide) {
      if (routeritem.path === "/") {
        arrlist = routeritem.children;
      }
    }
  });
}
resolveArr();


const setCollapseStyle = computed( () => {
  if (asideState.value.isCollapse)
  {
    return 'layout-aside-pc-64';
  }
  return 'layout-aside-pc-220';
})

</script>


<template>
  <el-aside class="layout-sidebar" :class="setCollapseStyle">
    <el-scrollbar class="aside-scrollbar">
      <el-menu :unique-opened="false" mode="vertical" router
               :default-active="route.path"
               :collapse="asideState.isCollapse">
        <template v-for="item in arrlist">
          <el-sub-menu v-if="item.children && item.children.length > 0 && item.meta.roles.includes(level)" :index="item.path">
            <template #title>
              <Icon :name="item.meta.icon"/>
              <span> {{ item.meta.name }} </span>
            </template>
            <Asideitem :chil="item.children"/>
          </el-sub-menu>

          <template v-else-if = "item.meta.roles.includes(level)">
            <el-menu-item :index="item.path">
              <Icon :name="item.meta.icon"/>
              <span> {{ item.meta.name }} </span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>


<style>
.aside-scrollbar{
  flex: 1;
  overflow-x: hidden;
}
</style>