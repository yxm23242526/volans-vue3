<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        mode="vertical">
        <el-menu-item  class="nest-menu">
              <el-icon>
              <edit />
            </el-icon>
            <RouterLink to="/main">主页</RouterLink>
        </el-menu-item>
        <el-sub-menu index="1" >
          <template #title>
            <el-icon>
              <grid />
            </el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" class="nest-menu">
              <el-icon>
              <edit />
            </el-icon>
            <RouterLink to="/weekreport/edit">填写周报</RouterLink>
            </el-menu-item>
            <el-menu-item index="1-2" class="nest-menu">
              <el-icon>
              <location />
            </el-icon>
            <RouterLink to="/weekreport/edit">周报管理</RouterLink>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lange = "ts" setup>
// import { useRouter } from "vue-router";
import variables from "@/themes/variables.module.scss"
import {reactive } from "vue";

reactive (variables);





</script>

<style></style>