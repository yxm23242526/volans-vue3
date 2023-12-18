<script setup>
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {computed, ref} from "vue";
import {Session} from "@/utils/storage";

const userStore = useUserStore()
const router = useRouter()

const userInfo = computed(() => {
  return Session.get('userInfo');
})
const getPhotoUrl = computed(() => {
  return userInfo.value?.photo
})
const onDropDownCommand = (path) => {
  if (path === 'logout') {
    ElMessageBox({
      title: '提示',
      message: '此操作将退出登录, 是否继续?',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = '退出中';
          setTimeout( () => {
            ElMessage({type: 'success', message: '退出成功'})
            done();
          }, 700)
          // 1. 提示用户
        } else {
          done();
        }
      },
    }).then(async () => {
          userStore.clearUserInfo()
          await router.push('/login')
        })
        .catch(() => {});
  }
  else if (path === '/home')    {
    router.push(path);
  }
  else if (path === '/personal'){
    router.push(path);
  }
}
</script>

<template>
  <div class="mr15">
    <el-dropdown trigger="click" @command="onDropDownCommand">
        <span class="topbars-avator">
         <el-avatar :size="30"/>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="/home">首页</el-dropdown-item>
          <el-dropdown-item command="/personal">个人中心</el-dropdown-item>
          <el-dropdown-item divided command="logout"> 退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

</template>

<style scoped lang="scss">
.topbars-avator {
  cursor: pointer;
}
</style>