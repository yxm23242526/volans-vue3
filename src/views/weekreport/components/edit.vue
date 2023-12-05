<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus'
import { onMounted, reactive, watch } from 'vue';
import Weekselection from './weekselection.vue';

interface User {
  date: String,
  name: String,
  content: String, 
  worktime: String,
  result: String,
}

interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}


var formdata = reactive(
  {
    username: '张三',
    number: '1234',
    starttime: '2023/11/26',
    endtime: '2023/12/5'
  })


const spanarr = reactive([]);

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
  var today = new Date() ;
  // today.setDate(1);
  console.log(today)
  inittabledata(formdata.starttime, formdata.endtime);
});

const inittabledata = (starttime: string, endtime: string) => {
  var end = new Date(Date.parse(endtime));
  var st = new Date(Date.parse(starttime));
  var days = (Date.parse(endtime) - Date.parse(starttime))/(1 * 24 * 60 * 60 * 1000);
  if (days > 0) {
    for (let i = 0; i <= days; i++) {
      tableData.push({
        date: st.getFullYear() + "/" + (st.getMonth() + 1) + "/" + st.getDate(),
        name: '',
        content: '',
        worktime: '',
        result: "",
      })
      st.setDate(st.getDate() + 1)
    }
  }
}

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



const handleadd = (index, row) => {
  tableData.splice(index + 1, 0, {
    date: row.date,
    name: '',
    content: '',
    worktime: '0',
    result: "",
  });
}

const handledelete = (index, row) => {
  // if(spanarr[index] != 1)
  {
    tableData.splice(index, 1)
  }
}

const tableData = reactive([]);

watch(tableData, () => {
  getspanarr();
})
</script>

<template>
  <div>
    <h2> 周报填写</h2>

    <!-- <el-form :inline="true" :model="formdata" class="demo-form-inline">
      <el-form-item label="姓名：">
        <el-input v-model="formdata.username" disabled="true" clearable />
      </el-form-item>
      <el-form-item label="工号:" width="100">
        <el-input v-model="formdata.number" disabled="true" clearable />
      </el-form-item>
      <el-form-item label="起始日期">
        <el-time-select v-model="formdata.starttime" class="mr-4" placeholder="Start time"
          format="MM/DD/YYYY" />
        <el-time-select v-model="formdata.endtime" placeholder="End time"
          format="MM/DD/YYYY" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form> -->
    
    <Weekselection></Weekselection>
    <el-table :data="tableData" :span-method="objectSpanMethod" >
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



    <el-button type="primary">插入行</el-button>
  </div>
</template>

<style scoped></style>