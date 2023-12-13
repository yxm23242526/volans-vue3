<template>
  <div class="layout-padding">
    <div class="weekreport-mwr layout-padding-view">
      <div class="weekreport-wrapper">
        <el-button @click="isExpand = !isExpand">
          {{ isExpand ? '收起' : '全部展开' }}
          <template #icon>
            <Icon :name="isExpand ? 'ArrowUp' : 'ArrowDown'" />
          </template>
        </el-button>
      </div>
      <el-table :data="weekReportData" style="width: 100%" >
        <el-table-column prop="year" label="年份" width="150" />
        <el-table-column prop="name" label="期间" />
        <el-table-column prop="status" label="提交状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status === 2" round>已提交</el-tag>
            <el-tag v-else-if="scope.row.status === 1" round>新任务</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 0" round>未提交</el-tag>
            <el-tag type="danger" v-else round>回退</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="observer" label="最近查看人" />
        <el-table-column prop="action" label="操作" width="180">
          <template #default="scope">
            <div v-if="scope.row.status === 2">
              <el-button text type="primary" size="small" @click="onPreview(scope.$index)">查看</el-button>
              <el-button text type="primary" size="small" @click="onPopMessage">撤回</el-button>
            </div>
            <div v-else>
              <el-button text type="primary" size="small" @click="onPreview(scope.$index)">查看</el-button>
              <el-button text type="primary" size="small" @click="onEdit(scope.$index)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <WeekReportPrview ref="previewObj" :reportName="previewData.reportName" :isshow="previewData.isshow"/>
      <!-- 分页组件 -->
      <el-row class="mt15" v-if="isExpand">
        <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total"
          @current-change="changePage" layout="total, prev, pager, next">
        </el-pagination>
      </el-row>
      <el-row class="mt15" v-else>
        <div class="weekreport-date">
          <!-- 这个以后再做 没想好怎么展示-->
          <p> {{ weekReportData[0]?.year }} 年 12 月</p>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script setup>


import { ref, onMounted, computed } from 'vue';
import { getWeekreportList } from '@/apis/report';
import { Session } from '@/utils/storage';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getMonthandDay } from '@/utils/datetimeUtils'
import WeekReportPrview from '@/views/weekreport/common/reportpreview.vue'
const userId = Session.get('userInfo').userId

//true：全部展示  false：按月展示
const isExpand = ref(true)
const pageParams = ref({
  userId: userId,
  page: 1, //第几页
  pagesize: 12, // 每页多少条
  total: 0
})
const previewData = {}
const weekReportData = ref([])

//获取周报数据
const getList = async () => {
  const { data } = await getWeekreportList(pageParams);
  //这里之后要变成total
  pageParams.value.total = data.length
  weekReportData.value = data;
  for (let i = 0; i < data.length; i++) {
    let stDate = new Date(weekReportData.value[i].startDate)
    weekReportData.value[i].stDate = stDate
    let edDate = new Date(weekReportData.value[i].endDate)
    weekReportData.value[i].edDate = edDate
    weekReportData.value[i].year = stDate.getFullYear();
    weekReportData.value[i].name = getMonthandDay(stDate) + '~' + getMonthandDay(edDate);
    weekReportData.value[i].observer = "-";
  }
  //修改数据格式
}
onMounted(() => {
  //created时获取默认数据  TODOBUG 这个数据目前显示有延迟问题
  getList();
})


//分页更改页码
const changePage = (newPage) => {
  pageParams.page = newPage
  getList();
}


//操作栏弹框
const onPopMessage = () => {
  ElMessageBox.confirm(
    '撤回已提交周报， 是否继续？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '撤回成功',
      })
    }).catch(() => {
      //什么都不做
    })
}


//预览对话盒对象
const previewObj = ref(null)
//打开查看窗口
const onPreview = (rowIndex) => {
  previewData.startDate = weekReportData.value[rowIndex].startDate
  previewData.endDate = weekReportData.value[rowIndex].endDate
  previewData.reportName = weekReportData.value[rowIndex].name;
  previewData.userId = pageParams.value.userId;
  previewData.rows = weekReportData.value[rowIndex].rows;
  previewObj.value.openDialog(previewData)
}

import { useRouter } from "vue-router";
const router = useRouter()
//打开编辑窗口
const onEdit = (rowIndex) => {
  const id = weekReportData.value[rowIndex].userId
  Session.set(`weekreport${id}`,weekReportData.value[rowIndex])
  router.push({path: `/TESTDEMO/${id}`})
}
</script>


<style lang="scss">
.weekreport {
  &-mwr {
    padding: 20px;
  }

  &-date {
    color: var(--vl-text-main-color);
  }

  &-row {
    display: flex;
    flex-direction: column;
  }

  &-wrapper {
    display: flex;
    justify-content: end;
  }

  &-option {
    display: flex;
    flex-direction: row;
  }
}
</style>
