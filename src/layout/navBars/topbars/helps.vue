<script setup>
import {inject} from "vue";

const version = inject('version')
</script>

<template>
    <el-dropdown>
      <div class="layout-topbar-item-icon">
        <div>
          <Icon name="Warning" :size="15"/>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>版本:{{ version }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

</template>

<style scoped>
</style>