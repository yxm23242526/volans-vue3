<script setup>
import {computed, reactive, watch} from "vue";
import router from "@/router";
import { Local } from "@/utils/storage";
import { useThemeConfigStore} from "@/stores/themeConfig";
const themeConfigStore = useThemeConfigStore()
const themeConfig = computed( () => {
  return themeConfigStore.themeConfig
})
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


// 展开/收起左侧菜单点击
const changeCollapse = () => {
  themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
  setLocalThemeConfig();
};
// 存储布局配置
const setLocalThemeConfig = () => {
  Local.remove('themeConfig');
  Local.set('themeConfig', themeConfig.value);
};

</script>

<template>
  <div class="layout-navbars-breadcrumb-container">
    <Icon :name="themeConfig.isCollapse ? 'Expand' : 'Fold'"
          :size=16
          class="layout-navbars-icon"
          @click="changeCollapse"
    />

    <el-breadcrumb class="layout-navbars-breadcrumb" separator="/">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">
        {{ item.meta.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>


<style lang="scss" scoped>
.layout-navbars-breadcrumb-container {
  display: flex;
  height: inherit;
}

.layout-navbars-breadcrumb {
  display: flex;
  font-size: 14px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}

.layout-navbars-icon {
  width: 50px;
  &:hover{
    cursor: pointer;
  }
}
</style>
  