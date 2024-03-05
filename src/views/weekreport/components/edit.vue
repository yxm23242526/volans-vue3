<script setup>
import {reactive, watch, ref, computed,} from 'vue';
import {useRoute} from "vue-router";
import {useTagsViewStore} from '@/stores/tags'
import {ElMessage, ElMessageBox} from 'element-plus';
import {Session} from '@/utils/storage';
import {calcuateDate, compareDate,getDayString, mult, formatDate} from "@/utils/datetimeUtils";
import {getProjectsAPI} from "@/apis/project";
import {submit} from "@/apis/report";
import {verifyNumberIntegerAndFloat} from "@/utils/validate";

const route = useRoute();
const tagsViewStore = useTagsViewStore()

//表单对象
const formRef = ref(null)
//表单数据
const formData = reactive({
  tableData: [],
  rules:{
    projectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
    workContent: [{ required: true, message: '工作内容不能为空', trigger: 'change' }],
    workTime: [{required: true, message: '错误', trigger: 'change' }],
  },
})
//周报数据
const reportData = ref([])

//下拉选择插入日期
const insertDateArray = ref([])
//下拉选择按钮文本
const insertDateTitle = ref()

//项目数据
const projectList = ref([])

//表格跨度数组
const spanArray = ref([])
const initSpanArray = () => {
  spanArray.value = []
  let temp = 0;
  for (let index = 0; index < formData.tableData.length; index++) {
    if (index === 0) {
      spanArray.value.push(1);
      temp = 0;
    } else {
      if (formData.tableData[index].date === formData.tableData[index - 1].date) {
        spanArray.value.push(0);
        spanArray.value[temp]++;
      } else {
        temp = index;
        spanArray.value.push(1);
      }
    }
  }
}
const getProjectList = async () => {
  projectList.value = (await getProjectsAPI()).data
}
//type 0：删除，1插入
const modifyInsertDateArray = (type, startDate, endDate) => {
  insertDateTitle.value = '插入日期'
  //插入
  if (type === 1) {
    const days = mult(startDate, endDate);
    if (days > 0) {
      insertDateArray.value = []
      for (let i = 0; i <= days; i++) {
        const str = calcuateDate(startDate, i)
        insertDateArray.value.push({
          day: getDayString(str),
          date: str,
        })
      }
    } else {
      const length = insertDateArray.value.length;
      for (let i = 0; i < length; i++) {
        if (compareDate(insertDateArray.value[i].date, startDate) === 1) {
          insertDateArray.value.splice(i, 0, {
            day: getDayString(startDate),
            date: startDate,
          })
          return;
        }
      }
      insertDateArray.value.push({
        day: getDayString(startDate),
        date: startDate,
      })
    }
  }
  //删除
  else {
    const idx = insertDateArray.value.findIndex((item) => startDate === item.date)
    if (idx !== -1)
    {
      insertDateArray.value.splice(idx, 1)
    }
    if (insertDateArray.value.length === 0) {
      insertDateTitle.value = '不可插入日期'
    }
  }
}

//插入日期
const onDropDownCommand = (date) => {
  //删除一条数据
  modifyInsertDateArray(0, date, date);
  //添加一条data数据
  for (let i = 0; i < formData.tableData.length; i++) {
    if (compareDate(formData.tableData[i].date, date) === 1) {
      formData.tableData.splice(i, 0, {
        day: getDayString(date),
        date: date,
      })
      initSpanArray()
      return;
    }
  }
  formData.tableData.push({
    day: getDayString(date),
    date: date,
  })
  initSpanArray()
}
const weekreportState = reactive(
    {
      managerUserId: '',
      managerTaskId: '',
      editState: '',
    }
)
//初始化数据
const initData = (userId, taskId) => {
  const tempData = Session.get(`weekreport${userId}${taskId}`)
  weekreportState.managerUserId = userId
  weekreportState.managerTaskId = taskId
  weekreportState.editState = tempData.editState
  console.log("init" + weekreportState.editState)
  reportData.value = tempData;
  reportData.value.date = tempData.date;
  reportData.value.startDate = formatDate(tempData.startDate);
  reportData.value.endDate = formatDate(tempData.endDate);
  formData.tableData.splice(0, formData.tableData.length)
  //修改插入数组
  modifyInsertDateArray(1, reportData.value.startDate, reportData.value.endDate);
  for (let i = 0; i < tempData.rows.length; i++) {
    for (let j = 0; j < tempData.rows[i].content.length; j++) {
      const _formatDate = formatDate(tempData.rows[i].content[j].date);
      const _formatDay = getDayString(_formatDate);
      modifyInsertDateArray(0, _formatDate, _formatDate)
      tempData.rows[i].content[j].day = _formatDay
      tempData.rows[i].content[j].date = _formatDate;
      formData.tableData.push(tempData.rows[i].content[j]);
    }
  }
  initSpanArray()
  getProjectList()
}


//获取tagsView上的周报数据
watch(() => route, () => {
  const userId = route.params?.user;
  const taskId = route.params?.id;
  if (taskId && userId) {
    initData(userId, taskId)
  }

}, {
  deep: true,
  immediate: true
})

//合并单元格数据
const tableSpanStragety = ({
                            row,
                            column,
                            rowIndex,
                            columnIndex,
                          }) => {
  if (columnIndex === 0 || columnIndex === 1) {
    return {
      rowspan: spanArray.value[rowIndex],
      colspan: spanArray.value[rowIndex] > 0 ? 1 : 0,
    }
  }
}

//总工时
const totalTime =  computed(()  => {
  let sum = 0;
  formData.tableData.forEach(element => {
    sum += Number(element.workTime);
  })
  return sum;
})
//提交周报
const onSubmit = (formRef) => {
  if (!formRef) return;
  formRef.validate((valid) => {
    if (!valid) return ElMessage.warning('表格项必填未填');
    ElMessageBox({
      title: '提示',
      message: `已填写共${totalTime.value}小时，继续此操作将提交周报，是否确定?`,
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          setTimeout( () => {
            // ElMessage({type: 'success', message: '提交成功'})
            done();
          }, 700)
          // 1. 提示用户
        } else {
          done();
        }
      },
    }).then(async () => {
      const data = JSON.parse(JSON.stringify(formData.tableData));
      data.forEach((item) => {
        delete item.day;
      })
      if (weekreportState.editState === "me"){
        await submit(data, -1)
        tagsViewStore.removeAndGotoPage(route.path, `/weekreport/myWeekreport`);
      }
      else {
        await submit(data, weekreportState.managerUserId)
        tagsViewStore.removeAndGotoPage(route.path, `/weekreport/query`);
      }
      Session.remove(`weekreport${weekreportState.managerUserId}${weekreportState.managerTaskId}`)
    })
        .catch(() => {
          // ElMessage.error('提交失败')
        });
  });
}


//插入项目
const onAddProject = (index, row) => {
  formData.tableData.splice(index + 1, 0, {
    date: row.date,
    day: row.day,
    projectId: null,
    workContent: null,
    workTime: null,
  });
  initSpanArray()
  formRef.value.clearValidate();
}


//删除项目
const onRemoveProject = (index, row) => {
  formData.tableData.splice(index, 1)
  const idx = formData.tableData.findIndex((item) => row.date === item.date)
  if (idx === -1){
    modifyInsertDateArray(1, row.date, row.date)
  }
  initSpanArray()
  formRef.value.clearValidate();
}


const onVerifyWorktime  = (row, value) => {
  row.workTime = verifyNumberIntegerAndFloat(value)
}
</script>

<template>
  <div class="layout-padding">
    <div class="layout-padding-view layout-padding-auto layout-pd">
      <div class="edit-header">
        <div class="edit-header-time">{{ reportData.date }}</div>
        <div class="edit-wrapper">
          <el-dropdown type="primary" trigger="click" @command="onDropDownCommand">
            <el-button> {{ insertDateTitle }}</el-button>
            <template #dropdown>
              <el-dropdown-menu v-model="insertDateArray">
                <el-dropdown-item v-for="item in insertDateArray" :key="item.day" :command="item.date">
                  {{ item.date }}&nbsp({{ item.day }})
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button type="primary" @click="onSubmit(formRef)">提交</el-button>
        </div>
      </div>
      <div class="edit-container">
        <el-form ref="formRef" class="edit-body" :model="formData" :rules="formData.rules">
          <el-table :data="formData.tableData"
                    :span-method="tableSpanStragety"
                    :header-cell-style="{color:'#409EFF'}"
                    :header-row-style="{border:'1px solid black'}"
                    style="width: 100%;"
                    >
            <el-table-column prop="day" width="100"/>
            <el-table-column prop="date" label="日期" width="120"/>
            <el-table-column label="项目 " width="240">
              <template #default="scope">
                <el-form-item :prop="`tableData.${scope.$index}.projectId`" :rules="formData.rules.projectId">
                  <el-select v-model="scope.row.projectId" placeholder="请选择项目" filterable>
                    <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName"
                               :value="item.projectId" />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="工作内容">
              <template #default="scope">
                <el-form-item :prop="`tableData.${scope.$index}.workContent`" :rules="formData.rules.workContent">
                  <el-input v-model="scope.row.workContent"  type="textarea"
                            placeholder="请填写工作内容" autosize/>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="工时" width="100px">
              <template #default="scope">
                <el-form-item :prop="`tableData.${scope.$index}.workTime`" :rules="formData.rules.workTime">
                  <el-input v-model="scope.row.workTime" type="textarea" autosize @input="onVerifyWorktime(scope.row, $event)"/>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120px">
              <template #default="scope">
                <el-button text type="primary" size="small" @click="onAddProject(scope.$index, scope.row)">添加行
                </el-button>
                <el-button text type="danger" size="small" @click="onRemoveProject(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.el-table{
  --el-table-border-color: #409EFF;
}
.edit-wrapper {
  text-align: right;
  margin: 10px;

  > * {
    padding-right: 10px;
  }
}
.edit-header{
  display: flex;
  justify-content: space-between;
  height: 60px;
  .edit-header-time{
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 20px;
  }
  .edit-wrapper{
    display: flex;
    text-align: center;
    align-items: center;
  }
}
.edit-container{
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  .edit-body{
    width: 100%;
    height: inherit;
    display: flex;
    flex:1;
    flex-direction: column;
  }
}

</style>