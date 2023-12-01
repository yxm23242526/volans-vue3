<script setup>
import Breadcrumb from './topbars/breadcrumb.vue'
import TagsView from './tagsview/tagsview.vue'
import Settings from './topbars/settings.vue'
</script>

<template>
    <el-header class="layout-header">
        <!-- 以后可以把这个class单独拿出来的 -->
        <div class="layout-header-topbars">
            <Breadcrumb />
            <div class="layout-header-topbars-items">
                <Settings /> 
                <!-- 右上角其他组件 -->
            </div>
        </div>
        <TagsView/>
    </el-header>
</template>

<style scoped lang="scss">
</style>