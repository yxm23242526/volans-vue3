<script setup>
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {addProjectAPI, updateProjectAPI} from "@/apis/project";
import {getUserList} from "@/apis/report";

const state = reactive({
  projectData: {
      projectId: '',//项目Id
      projectName: '', //项目名称
      projectLeader: '', //项目负责人
      projectTime: '', //项目时间
      projectPartner: [], //项目参与者
  },
  dialog: {
    isShow: false, //默认不显示
    title: '',
  }
})
const emit = defineEmits(['onUpdate'])

//所有用户 TODO
const users = ref([]);
const userProps = {
  label: 'userName',
  value: 'userId',
}

//打开弹窗
const onOpenDialog = async (type, data) => {
  const temp = reactive(JSON.parse(JSON.stringify(data)))
  users.value = (await getUserList()).data
  state.projectData = temp;
  //编辑项目
  if (type === 'edit'){

      state.dialog.title = '编辑项目';
  }
  //新增项目
  else{
      state.dialog.title = '新增项目'
  }
  state.dialog.isShow = true;
}

const onCloseDialog = () => {
  state.dialog.isShow = false;
}

//修改项目
const onSubmit = () => {
  ElMessageBox.confirm(
      state.dialog.title === '编辑项目' ? '确定要提交修改吗？' : '确定要新增项目吗？',
      '警告',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      },
  ).then(async () => {
    if (state.dialog.title === '编辑项目')
    {
      await updateProjectAPI(state.projectData)
    }
    else
    {
      await addProjectAPI(state.projectData)
    }
    setTimeout(() => {
      ElMessage({
        type: 'success',
        message: state.dialog.title === '编辑项目' ?'已修改项目' : '已新增项目',
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
          <el-form-item label="项目名称">
            <el-input style="width: 300px" v-model="state.projectData.projectName" placeholder="添加项目名称" clearable />
          </el-form-item>
          <el-form-item label="项目负责人">
            <el-select
                v-model="state.projectData.projectLeader"
                style="width: 300px;"
                clearable
            >
              <el-option
                 v-for="item in users"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目时间">
            <el-date-picker
                v-model="state.projectData.projectTime"
                type="date"
                placeholder="选择时间"
                style="width: 240px"
                clearable
            />
          </el-form-item>
          <el-form-item label="项目参与者">
            <el-select-v2
                v-model="state.projectData.projectPartner"
                :options="users"
                :props="userProps"
                style="width: 300px;"
                multiple
                filterable
                clearable>
            </el-select-v2>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onCloseDialog">取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>