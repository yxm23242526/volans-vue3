<script setup>

import {defineComponent, onMounted, ref} from "vue";
import {getAllActiveUserList, deleteUser} from "@/apis/role";
import {ElMessage, ElMessageBox} from "element-plus";
import UserInfoDialog from "@/views/system/role/dialog.vue"

let userList = ref([])
let detailsStatus = ref(false);
let userInfo = ref()
let editStatus = ref(true);
let searchContent = ref()
let openType = ref()

const userProps = {
  label: 'userName',
  value: 'userId',
}

defineComponent({
  components: {
    UserInfoDialog
  }
})

onMounted(async () => {
  await refreshUserList();
})

async function refreshUserList() {
  userList.value = (await getAllActiveUserList()).data;
}

function editUser(row) {
  openType.value.onOpenDialog('edit', row);
}

function addUser() {
  openType.value.onOpenDialog('add', {});
}

function removeUser(userId) {
  ElMessageBox.confirm(
      `确定删除用户吗？`,
      '删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        await deleteUser(userId)
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        await refreshUserList();
      })
}

</script>

<template>
  <div class="layout-padding">
    <div class="layout-role">
      <!--      <div class="layout-role-filter">-->
      <!--        <el-select-v2-->
      <!--            v-model="searchContent"-->
      <!--            filterable-->
      <!--            :options="userList"-->
      <!--            :props="userProps"-->
      <!--            :reserve-keyword="false"-->
      <!--            placeholder="输入搜索"-->
      <!--            multiple-->
      <!--            clearable-->
      <!--            style="width: 100%"-->
      <!--            @change="filter"-->
      <!--        />-->
      <!--      </div>-->
      <div class="layout-role-data">
        <div class="layout-role-data-table">
          <el-table :data="userList" stripe height="100%" width="100%">
            <el-table-column prop="userId" label="工号" width="100%"/>
            <el-table-column prop="userName" label="姓名"/>
            <el-table-column prop="phone" label="手机号"/>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="removeUser(scope.row.userId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="layout-role-data-button">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </div>
      </div>
      <UserInfoDialog ref="openType" @onUpdate="refreshUserList"/>
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
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: row;
    border-radius: 5px;
  }

  .layout-role-data {
    width: 100%;
    flex-direction: column;
    height: 100%;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;

    .layout-role-data-table {
      height: 95%;
      width: 100%;
    }

    .layout-role-data-button {
      height: 5%;
      padding: 5px;
    }
  }
}

</style>