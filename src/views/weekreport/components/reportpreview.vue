<template>
  <el-dialog v-model="isVisible" @close="onClose" title="周报预览">
    <el-scrollbar max-height="600px">
      <el-descriptions :column="2" direction="vertical" border onselectstart="return false">
        <el-descriptions-item width="50%">
          <template #label>
            <div>
<!--              还是有点BUG的，这里图标的基准比字高一点-->
              <Icon name="user"/>
              用户名
            </div>
          </template>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportData.userId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div>
              <Icon name="Clock"/>
              周报时间
            </div>
          </template>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportData.startDate }}&nbsp;~&nbsp;{{ reportData.endDate }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div>
              <Icon name="Document"/>
                内容
            </div>
          </template>
          <el-row  v-for="dayItem in reportData.rows">
            <el-col :span="4">{{dayItem.curDate}}</el-col>
            <el-col :span="20">
              <el-row v-for="item in dayItem.content">
                <el-col :span="10"> 【{{item.projectId}}】 </el-col>
                <el-col :span="10"> {{item.workContent}} </el-col>
                <el-col :span="4"> {{item.workTime}} </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-descriptions-item>
      </el-descriptions>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
import {ref, computed, onMounted, reactive} from 'vue'
import {getProjectsAPI} from "@/apis/project";

const isVisible = ref(false)
const reportData = reactive({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  userId: {
    type: Number,
    default: () => '',
  },
  reportName: {
    type: String,
    default: () => '',
  },
  rows: {
    type: Object,
    default: () => '',
  },
})

const openDialog = async (previewData) => {
  const data = JSON.parse(JSON.stringify(previewData));
  reportData.startDate = data.startDate;
  reportData.endDate = data.endDate;
  reportData.userId = data.userId;
  reportData.reportName = data.reportName;
  reportData.rows = data.rows;
  isVisible.value = true;
  //TODO 复杂度较高，待优化
  const projectList = (await getProjectsAPI()).data
  reportData.rows.forEach((row) => {
    row.content.forEach((content) => {
      content.projectId = projectList.find((project) => project.projectId === content.projectId)?.projectName
    })
  })
}

defineExpose({
  openDialog
})
const onClose = () => {
  isVisible.value = false;
}



</script>

<style scoped>

</style>
  