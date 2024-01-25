<script setup>

import {computed, reactive, ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";
import {addTask, editTask} from "@/apis/task";

const emit = defineEmits(['onUpdate'])

const disabledDate = (type, time) => {
  var date = new Date(time)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().length > 1 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
  const day = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate();
  time = `${year}-${month}-${day}`
  if (type === 1)
  {
    if (state.taskInfo.endDate !== "")
    {
      return time > state.taskInfo.endDate
    }
  }
  else
  {
    if (state.taskInfo.startDate !== "")
    {
      return time < state.taskInfo.startDate
    }
  }
  return false;
}

const state = reactive({
  taskInfo: {
    startDate: '',
    endDate: '',
  },
  dialog: {
    isShow: false, //默认不显示
    title: '',
  }
})

const onOpenDialog = async (type, data) => {
  state.taskInfo = reactive(JSON.parse(JSON.stringify(data)))
  if (type === 'edit')
  {
    state.dialog.title = '编辑任务'
  }
  else
  {
    state.dialog.title = '新增任务'
  }
  state.dialog.isShow = true;
}

const onCloseDialog = () => {
  state.dialog.isShow = false;
}

const onSubmit = () => {
  ElMessageBox.confirm(
      state.dialog.title === '编辑任务' ? '确定要修改任务吗？' : '确定要新增任务吗？',
      '警告',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      },
  ).then(async () => {
    state.dialog.title === '编辑任务' ? await editTask(state.taskInfo) : await addTask(state.taskInfo);
    setTimeout(() => {
      ElMessage({
        type: 'success',
        message: state.dialog.title === '编辑任务' ? '已修改任务？' : '已新增任务',
      })
    }, 1000)
    //重新获取数据

  }).catch(() => {})
  state.dialog.isShow = false;
  emit('onUpdate');
}

defineExpose({
  onOpenDialog
})
</script>

<template>
  <div>
    <el-dialog v-model="state.dialog.isShow" @close="onCloseDialog" :title="state.dialog.title" :close-on-click-modal="false">
      <el-form label-position="left" label-width="100px">
        <el-form-item label="开始时间">
          <el-date-picker v-model="state.taskInfo.startDate"
                          type="date"
                          :disabled-date="(time) => disabledDate(1, time)"
                          value-format="YYYY-MM-DD"
                          placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="state.taskInfo.endDate"
                          type="date"
                          :disabled-date="(time) => disabledDate(2, time)"
                          value-format="YYYY-MM-DD"
                          placeholder="选择结束时间">
          </el-date-picker>
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