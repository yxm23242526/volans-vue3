<script setup>
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
const router = useRouter()
const userStore = useUserStore()
const userInfo = userStore.userInfo
const logout = () => {
  userStore.clearUserInfo()
  router.push('/login')
}
</script>

<template>
  <el-dropdown class="topbars-user-contanier">
      <span>
         <el-avatar :size="30" :src="userInfo?.photo" />
      </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          个人中心
        </el-dropdown-item>
        <el-dropdown-item>
          我的周报
        </el-dropdown-item>
        <el-dropdown-item divided class="topbars-user-logout" @click="logout">
          注销
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.topbars-user-contanier {
  &:hover {
    cursor: pointer;
  }
}

</style>