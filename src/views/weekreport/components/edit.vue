<script setup>
// import type { TableColumnCtx } from 'element-plus'
import { onMounted, reactive, watch, ref } from 'vue';
import { getWeekreport } from '@/apis/edit';
import { comparedate, calcuatedate, mult, formatdate } from '@/utils/datetimeUtils';


//用户数据，后期从用户信息拿
var formdata = reactive(
  {
    username: '张三',
    number: '3587',
    taskid: 1,
    starttime: '2023/12/1',
    endtime: '2023/12/7'
  })


const spanarr = reactive([]);//合并单元格数据

const dataarrary = reactive([]);//选择框候选值

const selectvalue = ref();//选择框值

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

//获取周报数据
const getList = async () => {
  const data = await getWeekreport([formdata.number, 1]);
  if (data.data.length == 0) {

  }
  else {
    if (data.data.length > 0) {
      data.data.forEach(element => {
        element.date = formatdate(element.date);
        tableData.push(element);
      });
    }
  }
}

onMounted(() => {
  initdatearrary(formdata.starttime, formdata.endtime);
  getList();
});

//初始化选择框数据
const initdatearrary = (starttime, endtime) => {
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


//检测表格数据更新合并单元格数组
watch(tableData, () => {
  getspanarr();
  checkdataarrary();
})
</script>

<template>
  <div>
    <el-form :inline="true" :model="formdata" class="demo-form-inline">
      <el-form-item label="姓名：">
        <el-input v-model="formdata.username" disabled="true" clearable />
      </el-form-item>
      <el-form-item label="工号:" width="100">
        <el-input v-model="formdata.number" disabled="true" clearable />
      </el-form-item>
      <el-form-item label="起始日期">
        <el-time-select v-model="formdata.starttime" disabled="true" class="mr-4" placeholder="Start time"
          format="MM/DD/YYYY" />
        <el-time-select v-model="formdata.endtime" disabled="true" placeholder="End time" format="MM/DD/YYYY" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" :span-method="objectSpanMethod">
      <el-table-column prop="date" label="日期" width="160" />
      <el-table-column label="项目 " width="160">
        <template #default="scope">
          <el-input v-model="scope.row.projectId" autosize type="textarea" placeholder="项目" resize="none" />
        </template>
      </el-table-column>

      <el-table-column label="工作内容" width="320">
        <template #default="scope">
          <el-input v-model="scope.row.workContent" autosize type="textarea" placeholder="工作内容" resize="none" />
        </template>
      </el-table-column>
      <el-table-column label="工时" width="80">
        <template #default="scope">
          <el-input-number v-model="scope.row.workTime" :controls="false" style="width: 50px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button text type="primary" @click="handleadd(scope.$index, scope.row)">添加项目</el-button>
          <el-button text type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-select v-model="selectvalue" placeholder="Select">
      <el-option v-for="item in dataarrary" :key="item.value" :label="item.label" :value="item.value"
        :disabled="item.disabled" />
    </el-select>
    <el-button type="primary" @click="addrow">插入行</el-button>
  </div>
</template>

<style scoped></style>