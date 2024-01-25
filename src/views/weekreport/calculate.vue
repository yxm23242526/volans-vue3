<script setup>
import {ref, reactive, onMounted, onBeforeMount} from 'vue'
import {exportResult, query} from "@/apis/report";
import {getProjectsAPI} from "@/apis/project";
import {getUserList} from "@/apis/role";

let projectList = ref('')
let userList = ref('')
let results = ref([])
const state = reactive({
  formData: {
    model: '',
    projectId: [],
    userId: [],
    date:[],
  },
  button: {
    isExpand: true,
    title: '收起',
  }
})


const userProps = {
  label: 'userName',
  value: 'userId',
}

const projectProps = {
  label: 'projectName',
  value: 'projectId',
}

function clearResult() {
  results.value = []
}

onBeforeMount(() => {
  state.formData.model = 2;
})

onMounted(async () => {
  userList.value = (await getUserList()).data
  projectList.value = (await getProjectsAPI()).data
})

async function doExport(formData) {
  let url = (await exportResult(formData)).data
  let fileName = url.split('/').pop();
  fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
      });
}

async function doQuery(formData) {
  results.value = (await query(formData)).data
}

//收起展开
const onExpand = () => {
  state.button.isExpand = !state.button.isExpand
  state.button.title = state.button.isExpand === true ? '收起' : '展开';
}

</script>

<template>
  <div class="layout-padding">
    <div class="layout-padding-view layout-padding-auto layout-pd">
      <div class="layout-body-button">
        <el-button @click="onExpand">{{ state.button.title }}</el-button>
        <el-button v-if="!state.button.isExpand" type="primary" @click="doExport(state.formData)"
                   :disabled="results.length === 0">导出
        </el-button>
      </div>
      <div class="layout-body-query" v-if="state.button.isExpand">
        <el-form v-model="state.formData" label-width="120px">
          <el-form-item label="查询模式:">
            <el-radio-group v-model="state.formData.model" @change="clearResult">
              <el-radio-button :label="2">周模板</el-radio-button>
              <el-radio-button :label="1">季度模板</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="项目:">
            <el-select-v2
                v-model="state.formData.projectId"
                :options="projectList"
                :props="projectProps"
                style="width: 300px;"
                multiple
                filterable
                clearable>
            </el-select-v2>
          </el-form-item>
          <el-form-item label="员工:">
            <el-select-v2
                v-model="state.formData.userId"
                :options="userList"
                :props="userProps"
                style="width: 300px;"
                multiple
                filterable
                clearable>
            </el-select-v2>
          </el-form-item>
          <el-form-item label="起始时间:">
            <div style="width: 500px">
              <el-date-picker
                  v-model="state.formData.date"
                  type="daterange"
                  range-separator="To"
                  start-placeholder="Start Date"
                  end-placeholder="End Date"
                  value-format="YYYY-MM-DD"
                  style="width: 100%;"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doQuery(state.formData)">查询</el-button>
            <el-button type="primary" @click="doExport(state.formData)" :disabled="results.length === 0">导出
            </el-button>
          </el-form-item>
        </el-form>
        <el-divider/>
      </div>
      <div class="layout-body-form" :style="state.button.isExpand ? `height: calc(100% - 280px)` : `height: calc(100% - 40px)`">
        <el-table :data="results" v-if="state.formData.model === 2">
          <el-table-column fixed type="index" label="序号" width="100px"/>
          <el-table-column fixed prop="projectName" label="项目名称"/>
          <el-table-column prop="date" label="日期"/>
          <el-table-column prop="userName" label="员工"/>
          <el-table-column prop="workTime" label="工时"/>
          <el-table-column prop="workContent" label="工作内容"/>
        </el-table>
        <el-table :data="results" v-else>
          <el-table-column fixed type="index" label="序号" width="100px"/>
          <el-table-column fixed prop="projectName" label="项目名称"/>
          <el-table-column prop="workTime" label="总工时"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-body-button {
  height: 40px;
}

.layout-body-query {
  height: 240px;
}

.layout-body-form {
  display: flex;
  flex-direction: column;
}
</style>