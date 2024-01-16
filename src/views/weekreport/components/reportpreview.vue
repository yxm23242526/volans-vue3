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
        <el-descriptions-item span="2" v-for="(row,index) in reportData.rows" :key="index">
          <template #label>
            <div @click.stop="changeArrow(index)" class="descripition-header">
              <Icon :size="10" :name="getIconName(index)" />
              {{row.curDate}}
            </div>
          </template>
          <div class="descripition-main" v-show="expandArray[index]">
            <el-table class="descripition-table" :data="row.content" style="width: 100%"
                      :header-cell-style="{padding: '0'}" :cell-style="{padding: '0'}"
            >
              <el-table-column prop="projectId" label="项目" width="180"  align="center"/>
              <el-table-column prop="workTime" label="时长" width="100"  align="center"/>
              <el-table-column prop="workContent" label="内容"   align="center"/>
            </el-table>
          </div>
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
  reportData.startDate = previewData.startDate;
  reportData.endDate = previewData.endDate;
  reportData.userId = previewData.userId;
  reportData.reportName = previewData.reportName;
  reportData.rows = previewData.rows;
  isVisible.value = true;
  //每次打开要初始化一下
  for (let i = 0; i < reportData.rows.length; i++) {
    expandArray.value[i] = false;
  }
  //TODO 复杂度较高，待优化
  const projectList = (await getProjectsAPI()).data
  reportData.rows.forEach((row) => {
    row.content.forEach((content) => {
      content.projectId = projectList.find((project) => project.projectId === content.projectId).projectName
    })
  })
}

defineExpose({
  openDialog
})
const onClose = () => {
  isVisible.value = false;
}

const totalworktime = (content) => {
    let total = 0;
    for (let i = 0; i < content.length; i++)
    {
      total += content[i].worktime
    }
    return total
}

//下拉显示数组
const expandArray = ref([])

const getIconName = (row) => {
  return expandArray.value[row] === true ? "ArrowDown" : "ArrowUp";
}

const changeArrow = (row) => {
  expandArray.value[row] = !expandArray.value[row];
}

</script>

<style scoped>
.descripition-main{
  display: flex;
  flex-direction: column;
}
.descripition-header:hover{
    cursor: pointer;
    overflow: hidden;
}
.descripition-table::v-deep .el-table__body tr:hover > td {
  background-color: var(--el-color-primary-light-8) !important;
}

</style>
  