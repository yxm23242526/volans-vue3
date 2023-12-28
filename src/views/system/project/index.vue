<script setup>
import {onMounted, ref} from 'vue'
import {getProjectsAPI, removeProjectAPI} from "@/apis/project";
import {ElMessage, ElMessageBox} from "element-plus";
import ProjectDialog from '@/views/system/project/dialog.vue'

//搜索框活跃的对象
const activeProject = ref([])
//用于搜索框的响应式数组对象
const projectList = ref([])

const projectProps = {
  label: 'projectName',
  value: 'projectId',
}

onMounted(async () => {
  projectList.value = (await getProjectsAPI()).data
})

//激活搜索框中项目
const activeSearch = ({row}) => {
  for (let i = 0; i < activeProject.value.length; i++) {
    if (activeProject.value[i] === row.projectId) {
      return {'background': 'var(--el-color-success-light-8)'}
    }
  }
  return '';
}

//多选信息
const mutipleSelection = ref([])

const handleSelectionChange = (value) => {
  mutipleSelection.value = value;
}

//删除选中的项目条
const onRemove = () => {
  if (mutipleSelection.value.length === 0) {
    ElMessage({type: 'info', message: '没有任何选中'})
    return;
  }
  ElMessageBox.confirm(
      '确定要全部删除吗？',
      '警告',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '全部删除',
        cancelButtonText: '取消',
      },
  ).then(async () => {
    let ids = [];
    for (let i = 0; i < mutipleSelection.value.length; i++) {
      ids.push(mutipleSelection.value[i].projectId)
    }
    await removeProjectAPI(ids);
    //加点延迟，不然直接跳出来了
    setTimeout(() => {
      ElMessage({
        type: 'success',
        message: '已删除选中项目',
      })
    }, 1000)
    //重新获取数据
    await getProjectList()
  }).catch((action) => {
  })
}

const previewObj = ref(null)

//编辑选中的项目条
const onEdit = (type, value) => {
  previewObj.value.onOpenDialog(type, value);
}

//添加项目
const onAdd = (type) => {
  previewObj.value.onOpenDialog(type, {});
}
</script>

<template>
  <div class="layout-padding">
    <div class="layout-project-container">
      <el-select-v2
          v-model="activeProject"
          filterable
          :options="projectList"
          :props="projectProps"
          :reserve-keyword="false"
          placeholder="输入搜索"
          multiple
          clearable
          class="layout-project-container-table"
      />
      <div class="layout-project-body">
        <el-table
            @selection-change="handleSelectionChange"
            :data="projectList"
            style="width: 100%"
            :row-style="activeSearch"
            class="layout-project-body-table"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column property="projectName" label="项目名称" width="200"/>
          <el-table-column property="projectLeader" label="负责人" width="150"/>
          <el-table-column property="projectTime" label="项目时间" width="200"/>
          <el-table-column prop="action" label="操作" width="180">
            <template #default="scope">
              <el-button text type="primary" size="small" @click="onEdit('edit', scope.row)">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column property="projectPartner" label="参与者" show-overflow-tooltip/>
        </el-table>
        <div>
          <el-button class="layout-project-body-button" type="primary" @click="onAdd('add')">
            添加
          </el-button>
          <el-button class="layout-project-body-button" type="danger" @click="onRemove">
            删除
          </el-button>
        </div>
      </div>
      <ProjectDialog ref="previewObj" @onUpdate="getProjectList"/>
    </div>
  </div>
</template>

<style scoped>
.layout-project-container {
  display: flex;
  flex: 1;

  .layout-project-container-table {
    width: 20%;
  }

  .layout-project-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 25px;
    border: 1px solid var(--vl-border-sidebar-color);
    border-radius: 4px;

    .layout-project-body-table {
      flex: 1
    }

    .layout-project-body-button {
      width: 200px;
    }
  }
}

</style>