<template>
  <el-table :data="weekReportData" style="width: 100%">
    <el-table-column prop="startDate" label="起始日期" width="180" />
    <el-table-column prop="endDate" label="结束日期" width="180" />
    <el-table-column prop="action" label="操作" width="180">
      <template v-slot="{ row }">
        <el-button size="small">查看</el-button>
        <el-button size="small" type="primary">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
    <!-- 分页组件 -->
    <el-row >
      <el-pagination :page-size="pageParams.pagesize" 
        :current-page="pageParams.page"
        :total="pageParams.total"
        @current-change="changePage"
        layout="prev, pager, next">
      </el-pagination>
    </el-row>
</template>

<script setup>
import { ref } from 'vue';
import { getWeekreportList } from '@/apis/report';
import { Local } from '@/utils/storage';
const userInfo = Local.get('user')

const pageParams = ref({
  userId: userInfo?.userId,
  page: 1, //第几页
  pagesize: 6, // 每页多少条
  total: null
})

const weekReportData = ref([])


const getList = async () => {
    const {data, total} = await getWeekreportList(pageParams);
    weekReportData.value = data;
    pageParams.value.total = total;
}

//created时获取默认数据
getList();

const changePage = (newPage) => {
   pageParams.value.page = newPage
   getList();
}
</script>
