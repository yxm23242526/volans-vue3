<script setup>
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {computed, ref} from "vue";
import {Session} from "@/utils/storage";
import Icon from "@/components/Icon/icon.vue";

const userStore = useUserStore()
const router = useRouter()

const userInfo = computed(() => {
  return Session.get('userInfo');
})
const getPhotoUrl = computed(() => {
  return userInfo.value?.photo
})
const logout = () => {
  userStore.clearUserInfo()
  // 1. 提示用户
  ElMessage({type: 'success', message: '退出成功'})
  router.push('/login')
}

const drawer = ref(false)

</script>

<template>
      <span class="topbars-avator">
         <el-avatar :size="30" @click="drawer = true"/>
      </span>
  <div>
    <el-drawer v-model="drawer"
               size="250px">
      <template #title>
        <div class="drawer-header-container">
          <div class="drawer-header-photo">
            <el-avatar :size="50"/>
          </div>
          <div class="drawer-header-info ml10">
            <span class="font18 mt3 mb3">{{ userInfo.userName }}</span>
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
      <div class="drawer-footer">
        <div class="drawer-item">
          <Icon name="Switch"/>
          <span @click="logout">退出</span>
        </div>
      </div>
    </el-drawer>
  </div>

</template>

<style scoped lang="scss">
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

    :hover {
      cursor: pointer;
      background-color: var(--vl-color-drawer-hover);
    }
  }

  &-footer {
    border-top: 1px solid var(--vl-border-color-light);

    :hover {
      cursor: pointer;
      background-color: var(--vl-color-drawer-hover);
    }
  }

  &-item {
    font-size: 14px;
    padding: 10px 25px;
    height: 40px;
    color: var(--vl-color-drawer-color);

    span {
      padding-left: 5px;
    }
  }
}

:deep(.el-overlay) {
  background-color: transparent;
}
</style>