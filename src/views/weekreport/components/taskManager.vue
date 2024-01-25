<script setup>

import {onMounted, ref} from 'vue'
import {getTaskList, deleteTask} from "@/apis/task";
import {ElMessage, ElMessageBox} from "element-plus";
import taskDialog from "@/views/weekreport/components/taskDialog.vue";

let taskList = ref()
const dialogView = ref()

onMounted(() => {
  refreshTaskList();
})

async function refreshTaskList() {
  taskList.value = (await getTaskList()).data
}

function removeTask(taskId) {
  ElMessageBox.confirm(
      `确定删除任务吗？`,
      '删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        await deleteTask(taskId)
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        await refreshTaskList();
      })
}

function addTask() {
  dialogView.value.onOpenDialog('add', {});
}

function editTask(row) {
  dialogView.value.onOpenDialog('edit', row);
}

</script>

<template>
  <div class="layout-padding">
    <div class="layout-padding-auto layout-padding-view">
      <el-table :data="taskList" style="height: 100%">
        <el-table-column type="index" label="序号" width="100%"/>
        <el-table-column label="时间" width="200px">
          <template #default="scope">
            <div>
              {{scope.row.startDate}}&nbsp;~&nbsp;{{scope.row.endDate}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="unSubmitUserName" label="未提交"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editTask(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="removeTask(scope.row.taskId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="layout-role-data-button">
        <el-button type="primary" @click="addTask">添加任务</el-button>
      </div>
      <taskDialog ref="dialogView" @onUpdate="refreshTaskList"/>
    </div>
  </div>
</template>

<style scoped>

</style>