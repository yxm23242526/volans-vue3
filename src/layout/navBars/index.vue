<script setup>
import Breadcrumb from './topbars/breadcrumb.vue'
import TagsView from "@/layout/navBars/tagsview/tagsview.vue";
import Horizontal from './topbars/index.vue'
</script>

<template>
    <el-header class="layout-header">
        <Horizontal/>
        <TagsView/>
    </el-header>
</template>

<style scoped lang="scss">

</style>