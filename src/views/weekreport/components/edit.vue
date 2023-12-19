<script setup>
import { reactive, watch, ref} from 'vue';
import { submit, getProject } from '@/apis/edit';
import { comparedate, calcuatedate, mult, formatdate } from '@/utils/datetimeUtils';
import { ElScrollbar } from 'element-plus';
import { useRoute} from "vue-router";
import { Session } from '@/utils/storage';
const route = useRoute();

//用户数据，后期从用户信息拿
var formdata = reactive({

})


const spanarr = reactive([]);//合并单元格数据

const dataarrary = reactive([]);//选择框候选值

const selectvalue = ref();//选择框值

const projectarrary = reactive([]);

const tableData = reactive([]);//表格数据

//更新合并单元格数组
const getspanarr = () => {
  spanarr.splice(0, spanarr.length);
  let temp = 0;
  for (let index = 0; index < tableData.length; index++) {
    if (index == 0) {
      spanarr.push(1);
      temp = 0;
    }
    else {
      if (tableData[index].date == tableData[index - 1].date) {
        spanarr.push(0);
        spanarr[temp]++;
      }
      else {
        temp = index;
        spanarr.push(1);
      }
    }
  }
}

const inituserinfo = (taskId) => {
  const tempdata = Session.get('weekreport'+taskId);
  formdata.userId = tempdata.userId;
  formdata.taskid = taskId;
  formdata.starttime = formatdate(tempdata.startDate);
  formdata.endtime = formatdate(tempdata.endDate);
  tableData.splice(0, tableData.length)
  for (let i = 0; i < tempdata.rows.length; i++) 
  {
    for (let j = 0; j < tempdata.rows[i].content.length; j++) 
    {
      tempdata.rows[i].content[j].date = formatdate(tempdata.rows[i].content[j].date);
      tableData.push(tempdata.rows[i].content[j]);
    }
  }
}

const initprojectarrary = async () => {
  projectarrary.splice(0, projectarrary.length)
  const data = await getProject();
  projectarrary.push(...data.data);
}

//初始化选择框数据
const initdatearrary = (starttime, endtime) => {
  dataarrary.splice(0, projectarrary.length)
  var days = mult(starttime, endtime);
  if (days > 0) {
    for (let i = 0; i <= days; i++) {
      var str = calcuatedate(starttime, i)
      dataarrary.push({
        value: str,
        label: str,
        disabled: false,
      })
    }
  }
}

//合并单元格数据
const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}) => {
  if (columnIndex == 0) {
    return {
      rowspan: spanarr[rowIndex],
      colspan: spanarr[rowIndex] > 0 ? 1 : 0,
    }
  }
}

//插入行
const handleadd = (index, row) => {
  tableData.splice(index + 1, 0, {
    date: row.date,
  });
}

//删除行
const handledelete = (index, row) => {
  tableData.splice(index, 1)
}

//插入新的日期
const addrow = () => {
  if (selectvalue.value === '') {
    alert('请选择日期');
  }
  else {
    if (tableData.length > 0) {
      for (let i = 0; i < tableData.length; i++) {
        if (comparedate(selectvalue.value, tableData[i].date) < 0) {
          tableData.splice(i, 0, {
            date: selectvalue.value,
          });
          break;
        }
        else if (i === tableData.length - 1) {
          tableData.splice(i + 1, 0, {
            date: selectvalue.value,
          });
          break;
        }
      }
    }
    else {
      tableData.push(
        {
          date: selectvalue.value,
        }
      )
    }
  }
}


const checkdataarrary = () => {
  for (let i = 0; i < dataarrary.length; i++) {
    var temp = false;
    for (let j = 0; j < tableData.length; j++) {
      if (comparedate(dataarrary[i].value, tableData[j].date) === 0) {
        selectvalue.value = '';
        dataarrary[i].disabled = true;
        temp = true;
        break;
      }
    }
    if (!temp) {
      selectvalue.value = '';
      dataarrary[i].disabled = false;
    }
  }
}

const checktabel = () => {
  if (tableData.length == 0) {
    alert("没有数据");
    return false;
  }
  if (!tableData[0].projectId || tableData[0].projectId <= 0) {
    alert("项目id");
    return false;
  }
  if (!tableData[0].workContent || tableData[0].workContent === '') {
    alert("工作内容");
    return false;
  }
  if (!tableData[0].workTime || tableData[0].workTime === '') {
    alert("工时");
    return false;
  }
  if (tableData.length == 1) {
    alert("success");
    return true
  }
  let temp = {};
  temp[tableData[0].projectId] = 1;
  for (let i = 1; i < tableData.length; i++) {
    if (!tableData[i].projectId || tableData[i].projectId <= 0) {
      alert("项目id");
      return false;
    }
    if (!tableData[i].workContent || tableData[i].workContent === '') {
      alert("工作内容");
      return false;
    }
    if (!tableData[i].workTime || tableData[i].workTime === '') {
      alert("工时");
      return false;
    }
    if (tableData[i].date != tableData[i - 1].date) {
      temp = {}
    }
    if (temp[tableData[i].projectId]) {
      alert("重复项");
      return false;
    }
    else {
      temp[tableData[i].projectId] = 1;
    }
  }
  alert("success");
}

const save = async () => {
  checktabel();
  const data = await submit(tableData, 0);
}

const onsubmit = async () => {
  checktabel();
  const data = await submit(tableData, 1);

}



//检测表格数据更新合并单元格数组
watch(tableData, () => {
  getspanarr();
  checkdataarrary();
})

watch(() => route, ()=>{
    const taskId = route.params?.id;
    if (taskId)
    {
      inituserinfo(taskId);
      initprojectarrary();
      initdatearrary();
    }
},{
    deep: true,
    immediate: true
})
</script>

<template>
  <div class="layout-padding">
    <div class="layout-padding-view">
      <div class="editcontainer">

        <div class="editcontainer weekreport-wrapper">
          <el-button @click="save">保存</el-button>
          <el-button type="primary" @click="onsubmit">提交</el-button>
        </div>
        <el-scrollbar >
          <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
            <el-table-column prop="date" label="日期" width="100px" />
            <el-table-column label="项目 " width="200px">
              <template #default="scope">
                <el-select v-model="scope.row.projectId" placeholder="Select">
                  <el-option v-for="item in projectarrary" :key="item.projectId" :label="item.projectName"
                    :value="item.projectId" />
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="工作内容">
              <template #default="scope">
                <el-input v-model="scope.row.workContent" :autosize="{ minRows: 2, maxRows: 8 }" type="textarea"
                  placeholder="工作内容" resize="none" />
              </template>
            </el-table-column>
            <el-table-column label="工时" width="100px">
              <template #default="scope">
                <el-input-number v-model="scope.row.workTime" :controls="false" style="width: 50px" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
              <template #default="scope">
                <el-button text type="primary" @click="handleadd(scope.$index, scope.row)">添加项目</el-button>
                <el-button text type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="editcontainer weekreport-wrapper">
            <el-select v-model="selectvalue" placeholder="Select">
              <el-option v-for="item in dataarrary" :key="item.value" :label="item.label" :value="item.value"
                :disabled="item.disabled" />
            </el-select>
            <el-button @click="addrow">插入行</el-button>
          </div>
        </el-scrollbar>




      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editcontainer {
  padding: 15px;
}

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