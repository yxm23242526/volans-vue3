<template>
    <div>
        <h2> 周报填写</h2>

        <el-form :inline="true" :model="formdata" class="demo-form-inline">
            <el-form-item label="姓名：">
                <el-input v-model="formdata.username" disabled="true" clearable />
            </el-form-item>
            <el-form-item label="工号:" width="100">
                <el-input v-model="formdata.number" disabled="true" clearable />
            </el-form-item>
            <el-form-item label="起始日期">
                <el-time-select v-model="formdata.starttime" :max-time="formdata.endtime" disabled="true" class="mr-4"
                    placeholder="Start time" format="MM/DD/YYYY" />
                <el-time-select v-model="formdata.endtime" :min-time="formdata.starttime" disabled="true"
                    placeholder="End time" format="MM/DD/YYYY" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit()">提交</el-button>
            </el-form-item>
        </el-form>


        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="项目名称 " width="200">
                <template #default="scope">
                    <el-select v-model="scope.row.name" filterable class="m-2" placeholder="选择项目" size="large">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="工作内容" width="320">
                <template #default="scope">
                    <el-input v-model="scope.row.workcontent" autosize type="textarea" placeholder="工作内容"
                        resize="none" />
                </template>
            </el-table-column>
            <el-table-column label="工时" width="70">
                <template #default="scope">
                    <el-input-number v-model="scope.row.dates" :controls="false" style="width: 45px" />
                </template>
            </el-table-column>
            <!-- <el-table-column label="本周工时分布">
                <el-table-column label="五" width="70">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.dates[0]" :controls="false" style="width: 45px" />
                    </template>
                </el-table-column>
                <el-table-column label="六" width="70">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.dates[1]" :controls="false" style="width: 45px" />
                    </template>
                </el-table-column>
                <el-table-column label="日" width="70">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.dates[2]" :controls="false" style="width: 45px" />
                    </template>
                </el-table-column>
                <el-table-column label="一" width="70">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.dates[3]" :controls="false" style="width: 45px" />
                    </template>
                </el-table-column>
                <el-table-column label="二" width="70">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.dates[4]" :controls="false" style="width: 45px" />
                    </template>
                </el-table-column>
                <el-table-column label="三" width="70">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.dates[5]" :controls="false" style="width: 45px" />
                    </template>
                </el-table-column>
                <el-table-column label="四" width="70">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.dates[6]" :controls="false" style="width: 45px" />
                    </template>
                </el-table-column>
            </el-table-column> -->
            <el-table-column label="完成情况" width="150">
                <template #default="scope">
                    <el-select v-model="scope.row.status" class="m-2" placeholder="Select" size="large">
                        <el-option key="按时完成" label="按时完成" value="按时完成" />
                        <el-option key="进行中" label="进行中" value="进行中" />
                        <el-option key="延时完成" label="延时完成" value="延时完成" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="备注" width="150">
                <template #default="scope">
                    <el-input v-model="scope.row.about" placeholder="Please input" border="0px" box-shadow="0 0 0 0px" />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" @click="addrow">插入行</el-button>
    </div>
</template>

<style></style>

<script lang="ts" setup>
import { onMounted, reactive,ref} from "vue";
import axios from 'axios';

var tableData = reactive([
    {
        name: '',
        workcontent: '',
        dates: 0,
        status: "",
        about: ""
    },
    {
        name: '',
        workcontent: '',
        dates: 0,
        status: "",
        about: ""
    },

])

var options = reactive([]);
  

var formdata = reactive(
    {
        username: '张三',
        number: '1234',
        starttime: '2023/11/22',
        endtime: '2023/11/29'
    })

const addrow = () => {
    tableData.push({
        name: '',
        workcontent: '',
        dates: 0,
        status: "",
        about: ""
    });
}

const submit = () => {

};

const handleDelete = (index, row) => {
    tableData.splice(index, 1);
    // dialogFormVisible.value =true;
    // formdata.name = row.name;
    // formdata.index = index;
}

onMounted(() =>{
    axios.get("http://127.0.0.1:4523/m2/3605216-0-default/126729414").then((result) => {
            options = result.data;
            });

})

</script>