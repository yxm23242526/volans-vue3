<script setup>

import {onMounted, ref} from "vue";
import {getAllUserList} from "@/apis/role";
import search from "@/layout/navBars/topbars/search.vue";

let userList = ref([])
let detailsStatus = ref(false);
let userInfo = ref()
let editStatus = ref(true);
let searchContent = ref()

const userProps = {
  label: 'userName',
  value: 'userId',
}

onMounted(async () => {
  userList.value = (await getAllUserList()).data;
})

function showDetails(row) {
  detailsStatus.value = true;
  userInfo.value = JSON.parse(JSON.stringify(row));
  if (editStatus)
  {
    closeEdit();
  }
}

function closeDetails() {
  detailsStatus.value = false;
}

function openEdit() {
  var divElement = document.getElementsByClassName("layout-role-details-body")[0];
  divElement.classList.remove("layout-role-details-body");
  divElement.classList.add("layout-role-details-body-edit");
  editStatus.value = false;
}

function closeEdit() {
  var divElement = document.getElementsByClassName("layout-role-details-body-edit")[0];
  divElement.classList.remove("layout-role-details-body-edit");
  divElement.classList.add("layout-role-details-body");
  editStatus.value = true;
}

function filter() {
  userList.value.filter((item) => {
    if (item.userName.indexOf(val) > -1) {
      return item;
    }
  })
}

</script>

<template>
  <div class="layout-padding">
    <div class="layout-role">
      <div class="layout-role-filter">
        <el-select-v2
            v-model="searchContent"
            filterable
            :options="userList"
            :props="userProps"
            :reserve-keyword="false"
            placeholder="输入搜索"
            multiple
            clearable
            style="width: 100%"
            @change = "filter"
        />
        <div>
          <el-menu>
            <el-menu-item index="1">1111</el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="layout-role-data">
          <el-table :data="userList" stripe height="100%" width="100%" @row-click="showDetails">
            <el-table-column prop="userId" label="工号"/>
            <el-table-column prop="userName" label="姓名"/>
            <el-table-column prop="departmentId" label="部门"/>
            <el-table-column prop="phone" label="手机号"/>
            <el-table-column prop="status" label="状态"/>
            <el-table-column label="操作">
              <el-button type="primary" @click="">离职</el-button>
              <el-button type="primary" @click="">删除</el-button>
            </el-table-column>
          </el-table>
      </div>
      <div v-show="detailsStatus" class="layout-role-details">
        <el-card class="layout-role-details-body" v-if="userInfo">
          <template #header>
            <div class="layout-role-details-body-header">
              <el-avatar :size="70" :src="userInfo.image"/>
              <el-input v-model="userInfo.userName" />
              <el-input v-model="userInfo.nickName" />
              <el-input v-model="userInfo.signature" />
            </div>
          </template>
          <el-form :model="userInfo">
            <el-form-item label="手机号:">
              <el-input v-model="userInfo.phone" />
            </el-form-item>
            <el-form-item label="部门:">
              <el-input v-model="userInfo.departmentId" />
            </el-form-item>

          </el-form>
          <template #footer>
            <div v-if="editStatus">
              <el-button @click="openEdit" type="primary">编辑</el-button>
            </div>
            <div v-else>
              <el-button @click="closeEdit" type="primary">保存</el-button>
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-role {
  display: flex;
  padding: 1%;
  width: 100%;
  height: 100%;

  .layout-role-filter {
    width: 15%;
    height: 100%;
    background: red;
    display: flex;
    flex-direction: row;
    border-radius: 5px;
  }

  .layout-role-data {
    width: 60%;
    height: 100%;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
  }

  .layout-role-details {
    width: 23%;
    height: 100%;
    border-radius: 5px;

    .layout-role-details-body {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      :deep(.el-input__wrapper) {
        box-shadow: unset !important;
      }

      .layout-role-details-body-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 20px;
        font-family: 黑体,serif;
      }
    }

    .layout-role-details-body-edit {
      width: 100%;
      height: 100%;
      border-radius: 5px;

      .layout-role-details-body-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 20px;
        font-family: 黑体,serif;
      }
    }
  }
}

</style>