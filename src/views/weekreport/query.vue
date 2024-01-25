<script setup>

import {onMounted, reactive, ref} from "vue";
import {getAllActiveUserList} from "@/apis/role";

import {getSpecifiedReports, revokeWeekreport} from "@/apis/report";
import {formatDate} from "@/utils/datetimeUtils";
import {ElMessageBox} from "element-plus";
import WeekReportPreview from "@/views/weekreport/components/reportpreview.vue";
import {getTaskList} from "@/apis/task";
import {Session} from "@/utils/storage";
import {useRouter} from "vue-router";
const router = useRouter()
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
  userMaps: [],
})
onMounted(async () => {
  const res = await getAllActiveUserList()
  userList.value = res.data.map(({userId, userName}) => ({userId, userName}))

  const taskRes = await getTaskList()
  taskList.value = taskRes.data.map(({taskId, startDate, endDate}) => ({
    taskId, date: startDate + ' ~ ' + endDate
  }))

  const nameRes = await getAllActiveUserList();
  state.userMaps = nameRes.data.map(
      ({userId, userName}) => ({userId, userName})
  );
})


//预览对话盒对象
const previewObj = ref(null)

//查询
const onQuery = async () => {
  const res = await getSpecifiedReports(state.queryData)
  state.weekReportData = res.data.map(({
                                         startDate,
                                         endDate,
                                         rows,
                                         taskId,
                                         userId
                                       }) => (({date: formatDate(startDate)  + ' ~ ' + formatDate(endDate), rows, taskId, userId})))
  state.weekReportData.forEach((weekReport) => {
    weekReport.userName = state.userMaps[state.userMaps.findIndex(
        (item) => item.userId === weekReport.userId
    )].userName
    weekReport.name = weekReport.date;
  })
}


//预览周报
const onPreview = (rowIndex) => {
  const previewData = state.weekReportData[rowIndex]
  previewObj.value.openDialog(previewData)
}


//回退别人的周报
const onRollback = (rowIndex) => {
  const taskId = state.weekReportData[rowIndex].taskId
  const userId = state.weekReportData[rowIndex].userId
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
  }).catch(() => {
    //什么都不做
  })
}

//编辑
const onEdit = (rowIndex) => {
  const taskId = state.weekReportData[rowIndex].taskId
  const userId = state.weekReportData[rowIndex].userId
  Session.set(`weekreport${userId}${taskId}`, state.weekReportData[rowIndex])
  router.push({path: `/weekreport/edit/${userId}/${taskId}`})
}
</script>

<template>
  <div class="layout-padding">
    <div class="layout-padding-view layout-padding-auto">
      <div class="layout-query-header mt15">
        <span>请选择员工:</span>
        <span>
        <el-select-v2
            v-model="state.queryData.userId"
            :options="userList"
            :props="userProps"
            style="width: 300px;"
            multiple
            filterable
            clearable>
        </el-select-v2>
        </span>
        <span>请选择日期:</span>
        <span>
          <el-select-v2
              v-model="state.queryData.taskId"
              :options="taskList"
              :props="taskProps"
              style="width: 300px;"
              multiple
              filterable
              clearable>
        </el-select-v2>
        </span>
        <el-button type="primary" @click="onQuery">查询</el-button>
      </div>
      <el-table :data="state.weekReportData" style="width: 100%">
        <el-table-column prop="date" label="期间"/>
        <el-table-column prop="userName" label="员工"/>
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <div>
              <el-button text type="primary" size="small" @click="onPreview(scope.$index)">查看</el-button>
              <el-button text type="primary" size="small" @click="onEdit(scope.$index)">编辑</el-button>
              <el-button text type="danger" size="small" @click="onRollback(scope.$index)">回退</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <WeekReportPreview ref="previewObj"/>
    </div>
  </div>
</template>

<style scoped>
.layout-query-header {
  display: flex;
  align-items: center;
  span {
    margin: 0 10px;
  }
}
</style>