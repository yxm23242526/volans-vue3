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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportData.date}}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div>
              <Icon name="Document"/>
                内容
            </div>
          </template>
          <el-row  v-for="dayItem in reportData.rows">
            <el-col :span="4" v-if="dayItem.content[0].workContent !== null">{{dayItem.curDate}}
            </el-col>
            <el-col :span="20" v-if="dayItem.content[0].workContent !== null">
              <el-row v-for="item in dayItem.content">
                <el-col :span="6"> 【{{item.projectId}}】 </el-col>
                <el-col :span="12"> {{item.workContent}} </el-col>
                <el-col :span="2"> </el-col>
                <el-col :span="4"> {{item.workTime}} </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div v-if="reportData.rows[0].content[0].status === 1"> 无内容</div>
        </el-descriptions-item>
      </el-descriptions>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
import {ref, computed, onMounted, reactive} from 'vue'
import {getProjectsAPI} from "@/apis/project";
import {trimFloat} from "@/utils/validate";

const isVisible = ref(false)
const reportData = reactive({
  date: {
    type: String,
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
  reportData.date = data.date;
  reportData.userId = data.userId;
  reportData.reportName = data.name;
  reportData.rows = data.rows;

  isVisible.value = true;
  //TODO 复杂度较高，待优化
  const projectList = (await getProjectsAPI()).data
  reportData.rows.forEach((row) => {
    row.content.forEach((content) => {
      content.projectId = projectList.find((project) => project.projectId === content.projectId)?.projectName
      content.workTime = trimFloat(content.workTime, 1);
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
  