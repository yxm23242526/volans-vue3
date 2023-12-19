<!--
 * @Author: yxm
 * @Date: 2023-11-30 15:51:07
 * @Description: 
-->
<script setup>
import {useThemeConfigStore} from '@/stores/themeConfig';
import {computed, nextTick, onMounted, ref} from 'vue'
import {Local, Session} from '@/utils/storage'
import Icon from "@/components/Icon/icon.vue";

const userInfo = computed(() => {
  return Session.get('userInfo');
})


const getPhotoUrl = computed(() => {
  return userInfo.value.image
})


const themeConfigStore = useThemeConfigStore();
const themeConfig = computed( () => {
  return themeConfigStore.themeConfig;
})


onMounted(() => {
  //初始化所有设置
  initSettings();
});

// 设置缓存数据
const initSettings = () => {
  //主题
  Local.set('themeConfig', themeConfig.value);
  //目前不提函数出来 需要用的参数比较少
  document.documentElement.style.setProperty('--vl-menu-bg-color', themeConfig.value.menuBar);
  document.documentElement.style.setProperty('--vl-menu-text-color', themeConfig.value.menuBarTextColor);
  document.documentElement.style.setProperty('--vl-menu-active-color', themeConfig.value.menuBarActiveColor);
}
const drawer = ref(false)

</script>

<template>

  <div class="layout-topbar-item-icon" @click="drawer = true">
    <div>
      <Icon name="Setting" :size="15" />
    </div>
    <el-drawer v-model="drawer"
               size="250px">
      <template #title>
        <div class="drawer-header-container">
          <div class="drawer-header-photo">
            <el-avatar :size="50" :src="getPhotoUrl"/>
          </div>
          <div class="drawer-header-info ml10">
            <span class="font18 mt3 mb3"> {{ userInfo.userName }}</span>
            <span style="color:var(--vl-color-drawer-color);"> {{ userInfo.userId }}</span>
          </div>
        </div>
      </template>
      <div class="drawer-body">
        <div class="drawer-item">
          <Icon name="User"/>
          <span>个人中心</span>
        </div>
        <div class="drawer-item">
          <Icon name="Setting"/>
          <span>设置</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>


<style lang="scss" scoped>
.topbars-avator {
  cursor: pointer;
}

.drawer-header-container {
  display: flex;
}

.drawer-header-photo {
  width: 50px;
  height: 50px;
}

.drawer-header-info {
  display: flex;
  flex-direction: column;
}

.drawer {
  &-body {
    height: 200px;
  }

  &-footer {
    border-top: 1px solid var(--vl-border-color-light);
  }

  &-item {
    font-size: 14px;
    padding: 10px 25px;
    height: 40px;
    color: var(--vl-color-drawer-color);

    &:hover {
      cursor: pointer;
      background-color: var(--vl-color-drawer-hover);
    }

    span {
      padding-left: 5px;
    }
  }
}
</style>