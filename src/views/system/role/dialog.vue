<script setup>

import {computed, reactive, ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";
import {updateUser, addUser} from "@/apis/role";

const canEdit = computed(
    () => {
      return state.dialog.title === '编辑用户';
    }
)

const emit = defineEmits(['onUpdate'])

const state = reactive({
  userInfo: {
    userId: '',//用户Id
    userName: '', //用户名称
    nickName: '',
    phone: '',
    image: '', //用户
    signature: '', //用户
    groupId: '', //用户组Id
    identityId: '',
    departmentId: ''
  },
  dialog: {
    isShow: false, //默认不显示
    title: '',
  }
})

const onOpenDialog = async (type, data) => {
  const temp = reactive(JSON.parse(JSON.stringify(data)))
  state.userInfo = temp;
  //编辑项目
  if (type === 'edit'){

    state.dialog.title = '编辑用户';
  }
  //新增项目
  else{
    state.dialog.title = '新增用户'
  }
  state.dialog.isShow = true;
}

const onCloseDialog = () => {
  state.dialog.isShow = false;
}

const onSubmit = () => {
  ElMessageBox.confirm(
      state.dialog.title === '编辑用户' ? '确定要提交修改吗？' : '确定要新增用户吗？',
      '警告',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      },
  ).then(async () => {
    state.dialog.title === '编辑用户' ? await updateUser(state.userInfo) : await addUser(state.userInfo) ;
    setTimeout(() => {
      ElMessage({
        type: 'success',
        message: state.dialog.title === '编辑用户' ?'已修改用户' : '已新增用户',
      })
    }, 1000)
    //重新获取数据
    emit('onUpdate');
  }).catch(() => {})
  state.dialog.isShow = false;
}

defineExpose({
  onOpenDialog
})
</script>

<template>
  <div>
    <el-dialog v-model="state.dialog.isShow" @close="onCloseDialog" :title="state.dialog.title" :close-on-click-modal="false">
      <el-form label-position="left" label-width="100px">
        <el-form-item label="工号">
          <el-input style="width: 300px" v-model="state.userInfo.userId" placeholder="请输入工号" clearable :disabled="canEdit" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input style="width: 300px" v-model="state.userInfo.userName" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input style="width: 300px" v-model="state.userInfo.phone" placeholder="请输入手机号" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onCloseDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style>

</style>