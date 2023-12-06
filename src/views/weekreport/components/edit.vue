<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus'
import { onMounted, reactive, watch, ref } from 'vue';

//表格对象
interface User {
  date: String,
  name: String,
  content: String,
  worktime: String,
  result: String,
}

//合并单元格方法
interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}

//用户数据，后期从用户信息拿
var formdata = reactive(
  {
    username: '张三',
    number: '1234',
    starttime: '2023/12/1',
    endtime: '2023/12/5'
  })


const spanarr = reactive([]);//合并单元格数据

const dataarrary = reactive([]);//选择框候选值

const selectvalue = ref('');//选择框值

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

onMounted(() => {
  initdatearrary(formdata.starttime, formdata.endtime);
});

//初始化选择框数据
const initdatearrary = (starttime: string, endtime: string) => {
  var st = new Date(Date.parse(starttime));
  var days = (Date.parse(endtime) - Date.parse(starttime)) / (1 * 24 * 60 * 60 * 1000);
  if (days > 0) {
    for (let i = 0; i <= days; i++) {
      dataarrary.push({
        value: i,
        label: st.getFullYear() + "/" + (st.getMonth() + 1) + "/" + st.getDate(),
        disabled: false,
      })
      st.setDate(st.getDate() + 1)
    }
  }
}

//合并单元格数据
const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
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
    index: row.index,
    date: row.date,
    name: '',
    content: '',
    worktime: '0',
    result: "",
  });
}

//删除行
const handledelete = (index, row) => {
  if (spanarr[index] == 1) {
    for (let i = 0; i < dataarrary.length; i++) {
      if (dataarrary[i].value === tableData[index].index) {
        dataarrary[i].disabled = false;
        break;
      }
    }
  }
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
        if ((Number)(tableData[i].index) > (Number)(selectvalue.value)) {
          tableData.splice(i, 0, {
            index: selectvalue.value,
            date: dataarrary[(Number)(selectvalue.value)].label,
            name: '',
            content: '',
            worktime: '0',
            result: "",
          });
          break;
        }
        else if (i === tableData.length - 1) {
          tableData.splice(i + 1, 0, {
            index: selectvalue.value,
            date: dataarrary[(Number)(selectvalue.value)].label,
            name: '',
            content: '',
            worktime: '0',
            result: "",
          });
          break;
        }
      }
    }
    else {
      tableData.push(
        {
          index: selectvalue.value,
          date: dataarrary[(Number)(selectvalue.value)].label,
          name: '',
          content: '',
          worktime: '0',
          result: "",
        }
      )
    }
    for (let i = 0; i < dataarrary.length; i++) {
      if (dataarrary[i].value === selectvalue.value) {
        selectvalue.value = '';
        dataarrary[i].disabled = true;
        break;
      }
    }
  }
}


//检测表格数据更新合并单元格数组
watch(tableData, () => {
  getspanarr();
})
</script>

<template>
  <div class="layout-padding">
    <div class="layout-padding-view">
      <h2> 周报填写</h2>
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
            <el-input v-model="scope.row.name" autosize type="textarea" placeholder="项目" resize="none" />
          </template>
        </el-table-column>

        <el-table-column label="工作内容" width="320">
          <template #default="scope">
            <el-input v-model="scope.row.content" autosize type="textarea" placeholder="工作内容" resize="none" />
          </template>
        </el-table-column>
        <el-table-column label="工时" width="80">
          <template #default="scope">
            <el-input-number v-model="scope.row.worktime" :controls="false" style="width: 50px" />
          </template>
        </el-table-column>
        <el-table-column label="完成情况" width="150">
          <template #default="scope">
            <el-input v-model="scope.row.content" autosize type="textarea" placeholder="完成情况" resize="none" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button type="primary" @click="handleadd(scope.$index, scope.row)">添加项目</el-button>
            <el-button type="primary" @click="handledelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-select v-model="selectvalue" placeholder="Select">
        <el-option v-for="item in dataarrary" :key="item.value" :label="item.label" :value="item.value"
          :disabled="item.disabled" />
      </el-select>
      <el-button type="primary" @click="addrow">插入行</el-button>
    </div>

  </div>
</template>

<style scoped></style>