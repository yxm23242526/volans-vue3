<script setup>

import {nextTick, onBeforeMount, onMounted, reactive, ref} from "vue";
import {getAllActiveUserList} from "@/apis/role";
import {getSpecifiedReports, getTaskList, revokeWeekreport} from "@/apis/report";
import {ElMessageBox} from "element-plus";
import WeekReportPrview from "@/views/weekreport/components/reportpreview.vue";

const userList = ref([])
const taskList = ref([])
const userProps = {
  label: 'userName',
  value: 'userId',
}
const taskProps = {
  label: 'date',
  value: 'taskId',
}
const state = reactive({
  queryData: {
    userId: [],
    taskId: [],
  },
  weekReportData: [],
  previewData: {
    isshow:  false,
  },
})
onMounted(async () => {
  const res = await getAllActiveUserList()
  userList.value = res.data.map(({userId, userName}) => ({userId, userName}))

  const taskRes = await getTaskList()
  taskList.value = taskRes.data.map(({taskId, startDate, endDate}) => ({taskId, date: startDate + ' ~ ' + endDate
  }))
})


//预览对话盒对象
const previewObj = ref(null)

//查询
const onQuery = async () => {
  const res = await getSpecifiedReports(state.queryData)
  state.weekReportData = res.data
}

//预览周报
const onPreview = (rowIndex) => {
  state.previewData = state.weekReportData[rowIndex].map(
      ({startDate, endDate, name, userId, rows}) => ({startDate, endDate, reportName: name, userId, rows})
  )
  previewObj.value.openDialog(state.previewData)
}


//回退别人的周报
const onRollback = (rowIndex) => {
  ElMessageBox.confirm(
      '撤回已提交周报， 是否继续？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(async () => {
        await revokeWeekreport({taskId, userId});
        //删除表格中这个数据 TODO
      }).catch(() => {
    //什么都不做
  })
}
</script>

<template>
  <div class="layout-padding">
    <div class="layout-padding-view layout-padding-auto">
      <div class="layout-query-header">
        <span>请选择员工</span>
        <el-select-v2
            v-model="state.queryData.userId"
            :options="userList"
            :props="userProps"
            style="width: 300px;"
            multiple
            filterable
            clearable>
        </el-select-v2>

        <span>请选择日期</span>
        <el-select-v2
            v-model="state.queryData.taskId"
            :options="taskList"
            :props="taskProps"
            style="width: 300px;"
            multiple
            filterable
            clearable>
        </el-select-v2>
        <el-button type="primary" @click="onQuery">查询</el-button>
      </div>
      <el-table :data="state.weekReportData" style="width: 100%">
          <el-table-column prop="year" label="年份" width="150" />
          <el-table-column prop="date" label="期间" />
          <el-table-column prop="name" label="员工" />

          <el-table-column prop="action" label="操作">
            <template #default="scope">
              <div>
                <el-button text type="primary" size="small" @click="onPreview(scope.$index)">查看</el-button>
                <el-button text type="primary" size="small" @click="onRollback(scope.$index)">回退</el-button>
              </div>
            </template>
          </el-table-column>
      </el-table>
      <WeekReportPrview ref="previewObj" :reportName="state.previewData.reportName" :isshow="state.previewData.isshow"/>
    </div>
  </div>
</template>

<style scoped>
.layout-query-header {
  display: flex;
}
</style>