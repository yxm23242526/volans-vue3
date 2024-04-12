<template>
  <div class="layout-padding">
    <div class="layout-padding-view layout-padding-auto layout-pd">
      <el-table :data="weekReportData" style="width: 100%">
        <el-table-column prop="year" label="年份" width="150"/>
        <el-table-column prop="name" label="期间"/>
        <el-table-column prop="status" label="提交状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status === 2" round>已提交</el-tag>
            <el-tag v-else-if="scope.row.status === 1" round>新任务</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 0" round>未提交</el-tag>
            <el-tag type="danger" v-else round>回退</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <div v-if="scope.row.status === 2">
              <el-button text type="primary" size="small" @click="onPreview(scope.$index)">查看</el-button>
              <el-button text type="primary" size="small" @click="onPopMessage(scope.row.taskId)">撤回</el-button>
              <el-button text type="success" size="small" @click="onExport(scope.row.taskId)">导出</el-button>
            </div>
            <div v-else>
              <el-button text type="primary" size="small" @click="onPreview(scope.$index)">查看</el-button>
              <el-button text type="primary" size="small" @click="onEdit(scope.$index)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="observer" label="最近查看人" width="180"/>
      </el-table>
      <WeekReportPreview ref="previewObj"/>
      <!-- 分页组件 -->
      <el-row class="mt15 ml15" v-if="isExpand">
        <el-pagination :page-size="pageParams.pagesize"
                       v-model:current-page="pageParams.page" :total="pageParams.total"
                       @current-change="changePage" layout="total, prev, pager, next">
        </el-pagination>
      </el-row>
      <el-row class="mt15 ml15" v-else>
        <div class="weekreport-date">
          <!-- 这个以后再做 没想好怎么展示-->
          <p> {{ weekReportData[0]?.year }} 年 12 月</p>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script setup>


import {ref, onMounted, computed} from 'vue';
import {exportUserResult, getWeekreportList, revokeWeekreport} from '@/apis/report';
import {Session} from '@/utils/storage';
import {ElMessage, ElMessageBox} from 'element-plus';
import {formatDate, getMonthandDay} from '@/utils/datetimeUtils'
import WeekReportPreview from '@/views/weekreport/components/reportpreview.vue'
import {useRouter} from "vue-router";
const router = useRouter()
const userId = Session.get('userInfo').userId

//true：全部展示  false：按月展示
const isExpand = ref(true)
const pageParams = ref({
  userId: userId,
  page: 1, //第几页
  pagesize: 12, // 每页多少条
  total: 0
})

const weekReportData = ref([])
//保留一份原始数据
let rawData = []
//获取周报数据
const getList = (index) => {
  //复制一份
  weekReportData.value = JSON.parse(JSON.stringify(rawData))
  //剔除 [index * 10, (index + 1) * 10]之外的
  weekReportData.value = weekReportData.value.splice(index * 10, Math.min(pageParams.value.total,(index + 1) * 10))
}

const init = async () => {
  const {data} = await getWeekreportList({userId});
  pageParams.value.total = data.length
  rawData = data;
  //修改数据格式
  for (let i = 0; i < data.length; i++) {
    let stDate = new Date(rawData[i].startDate)
    rawData[i].stDate = stDate
    let edDate = new Date(rawData[i].endDate)
    rawData[i].edDate = edDate
    rawData[i].year = stDate.getFullYear();
    rawData[i].name = getMonthandDay(stDate) + '~' + getMonthandDay(edDate);
    rawData[i].date = formatDate(rawData[i].startDate) + ' ~ ' + formatDate(rawData[i].endDate);
    rawData[i].observer = "-";
  }
}


onMounted(async () => {
  //初始化数据
  await init()
  //created时获取默认数据  TODOBUG 这个数据目前显示有延迟问题
  getList(0);
})


//分页更改页码
const changePage = (newPage) => {
  pageParams.page = newPage
  getList(newPage - 1);
}


//操作栏弹框
const onPopMessage = (taskId) => {
  ElMessageBox.confirm(
      '撤回已提交周报， 是否继续？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        await revokeWeekreport({taskId, userId: -1})
        await init()
        getList(pageParams.value.page - 1)
      }).catch(() => {
    //什么都不做
  })
}

//导出周报到本地
const onExport = async (taskId) => {
  let url = (await exportUserResult(taskId)).data
  let fileName = url.split('/').pop();
  fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
      });
}

//预览对话盒对象
const previewObj = ref(null)
//预览对象
const previewData = {}
//打开查看窗口
const onPreview = (rowIndex) => {
  previewData.date = weekReportData.value[rowIndex].startDate + ' ~ ' + weekReportData.value[rowIndex].endDate
  previewData.reportName = weekReportData.value[rowIndex].name;
  previewData.userId =  weekReportData.value[rowIndex].userId;
  previewData.rows = weekReportData.value[rowIndex].rows;
  previewObj.value.openDialog(previewData)
}

//打开编辑窗口
const onEdit = (rowIndex) => {
  const taskId = weekReportData.value[rowIndex].taskId
  const userId = weekReportData.value[rowIndex].userId
  weekReportData.value[rowIndex].editState = "me"
  Session.set(`weekreport${userId}${taskId}`, weekReportData.value[rowIndex])
  router.push({path: `/weekreport/edit/${userId}/${taskId}`})
}
</script>


<style lang="scss">

</style>
