<template>
  <el-dialog v-model="isVisible" @close="onClose">
    <el-scrollbar max-height="600px">
      <el-descriptions title="周报预览" :column="2" direction="vertical" border>
        <el-descriptions-item>
          <template #label>
            <div>
              <Icon name="user"/>
              用户名
            </div>
          </template>
          {{ reportData.userId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div>
              <Icon name="PieChart"/>
              周报时间
            </div>
          </template>
          {{ reportData.startDate }}&nbsp;~&nbsp;{{ reportData.endDate }}
        </el-descriptions-item>
        <el-descriptions-item span="2" v-for="(row,index) in reportData.rows" :key="index">
          <template #label>
            <div>
              <Icon :size="10" class="descripition-icon" :name="getIconName(index)" @click.stop="changeArrow(index)"/>
              {{row.curdate}}
            </div>
          </template>
          <div class="descripition-main" v-show="expandArray[index]">
            <el-table class="descripition-table" :data="row.content" style="width: 100%"
                      :header-cell-style="{padding: '0'}"
            >
              <el-table-column prop="projectId" label="项目" width="180" />
              <el-table-column prop="worktime" label="时长" width="100" />
              <el-table-column prop="workContent" label="内容" />
            </el-table>
            <div class="descripition-totaltime"> 总时长:{{totalworktime(row.content)}}</div>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'

const isVisible = ref(false)
const reportData = ref({
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

const openDialog = (previewData) => {
  reportData.value.startDate = previewData.startDate;
  reportData.value.endDate = previewData.endDate;
  reportData.value.userId = previewData.userId;
  reportData.value.reportName = previewData.reportName;
  reportData.value.rows = previewData.rows;
  isVisible.value = true;
  //每次打开要初始化一下
  for (let i = 0; i < reportData.value.rows.length; i++)
  {
    expandArray.value[i] = false;
  }
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
.descripition-icon:hover{
    cursor: pointer;
    overflow: hidden;
}
.descripition{
  &-totaltime{

  }
  &-table{

  }
}
</style>
  