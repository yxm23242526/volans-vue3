<script setup>
import {ref, reactive, onMounted, watch} from 'vue'
import {getProjectList, getUserList, exportResult, query} from "@/apis/report";

let projectList = ref('')
let userList = ref('')
let fieldList = ref('')
let results = ref([])

const formData = ref({
  "model": '1',
  "projectId": '',
  "userId": '',
  "date": [],
})

function clearResult() {
  results.value = []
}

onMounted(async () => {
  userList.value = (await getUserList()).data
  projectList.value = (await getProjectList()).data

})

async function doExport(formData) {
  results.value = (await exportResult(formData)).data
}

async function doQuery(formData) {
  results.value = (await query(formData)).data
}

</script>

<template>
  <div class="layout-padding">
    <div class="main-body">
      <el-form v-model="formData" label-width="120px">
        <el-form-item label="查询模式:">
          <el-radio-group v-model="formData.model" @change="clearResult">
            <el-radio-button :label="1">季度模板</el-radio-button>
            <el-radio-button :label="2">周模板</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目:">
          <el-select v-model="formData.projectId" clearable>
            <el-option
                v-for="project in projectList"
                :key="project.projectId"
                :label="project.projectName"
                :value="project.projectId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工:">
          <el-select v-model="formData.userId" clearable>
            <el-option
                v-for="user in userList"
                :key="user.userId"
                :label="user.userName"
                :value="user.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间:">
          <div style="width: 500px">
            <el-date-picker
                v-model="formData.date"
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
          <el-button type="primary" @click="doQuery(formData)">查询</el-button>
          <el-button type="primary" @click="doExport(formData)" :disabled="results.length === 0">导出</el-button>
        </el-form-item>
      </el-form>
      <el-divider/>
      <div class="result-form">
        <div v-if="formData.model == 1">
          <el-table :data="results" height="500px">
            <el-table-column fixed prop="number" label="序号"/>
            <el-table-column fixed prop="projectName" label="项目名称"/>
            <el-table-column prop="workTime" label="总工时"/>
          </el-table>
        </div>
        <div v-else>
          <el-table :data="results" height="500px">
            <el-table-column fixed prop="number" label="序号"/>
            <el-table-column fixed prop="projectName" label="项目名称"/>
            <el-table-column prop="date" label="日期"/>
            <el-table-column prop="userName" label="员工"/>
            <el-table-column prop="workTime" label="工时"/>
            <el-table-column prop="workContent" label="工作内容"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-body {
  background: #FFFFFF;
  padding: 20px;
}
</style>