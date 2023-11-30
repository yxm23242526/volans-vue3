<script setup>
import Breadcrumb from './topbars/breadcrumb.vue'
import TagsView from './tagsview/tagsview.vue'
import Settings from './topbars/settings.vue'
</script>

<template>
    <div class="layout-topbar-container">
        <div class="topbars">
            <Breadcrumb />
            <div class="topbar-items">
                <Settings /> 
                <!-- 右上角其他组件 -->
            </div>
        </div>
        <TagsView/>
    </div>
</template>

<style scoped lang="scss">
.layout-topbar-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .topbars{
        display: flex;
        align-items: center;
        justify-content: space-between;
        // border: 1px solid red;
        .topbar-items{
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>