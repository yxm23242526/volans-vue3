<template>
  <div class="layout-padding">
    <div class="weekreport-mwr layout-padding-view">
      <el-table :data="weekReportData" style="width: 100%">
        <el-table-column prop="name" label="日期" />
        <el-table-column prop="status" label="提交状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status === 1" round>已提交</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 0" round>未提交</el-tag>
            <el-tag type="danger" v-else round>回退</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="observer" label="最近查看人" />
        <el-table-column prop="action" label="操作" width="180">
          <template v-slot="{ row }">
            <el-button type="primary" v-if="row.status === 1" size="small">查看</el-button>
            <el-button type="primary" v-else size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="weekreport-date pt15 pl10">
        <p>2023年12月</p>
      </div>
      <!-- 分页组件 -->
      <el-row>
        <el-pagination class="mt15" background :total="100" :page-size="5" layout="prev, pager, next">

        </el-pagination>
        <!-- <el-pagination :page-size="pageParams.pagesize" 
        :current-page="pageParams.page"
        :total="pageParams.total"
        @current-change="changePage"
        layout="prev, pager, next">
      </el-pagination> -->
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { getWeekreportList } from '@/apis/report';
import { Local } from '@/utils/storage';
const userInfo = Local.get('user')

const pageParams = ref({
  userId: userInfo.user?.userId,
  page: 1, //第几页
  pagesize: 6, // 每页多少条
  total: null
})

const weekReportData = ref([
  {
    name: 'Tom',
    status: 1,
    observer: ' A',
  },
  {
    name: 'Jac',
    status: 0,
    observer: ' B',
  },
  {
    name: 'Bes',
    status: 2,
    observer: ' C',
  },
  {
    name: 'Vxz',
    status: 1,
    observer: ' D',
  },
])


const getList = async () => {
  const { data, total } = await getWeekreportList(pageParams);
  //修改数据格式
  weekReportData.value = data;
}
onMounted( () => {
    //created时获取默认数据  TODOBUG 这个数据目前显示有延迟问题
    getList();
})

const changePage = (newPage) => {
  pageParams.page = newPage
  getList();
}
</script>


<style lang="scss">
.weekreport-mwr {
  padding: 20px;
}
.weekreport-date {
  color: var(--vl-text-main-color);
}
</style>
