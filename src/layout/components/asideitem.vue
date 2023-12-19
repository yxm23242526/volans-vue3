<!--
 * @Author: zzh
 * @Date: 2023-11-29
 * @Description: 
-->
<template>
    <template v-for="item in chil">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
            <template #title>
                <Icon :name="item.meta.icon"/>
                {{ item.meta.name }}
            </template>
            <asideitem :chil="item.children" />
        </el-sub-menu>
        <template v-else>
            <template v-if="!item.ishide">
                <el-menu-item :index="item.path">
                        <Icon :name="item.meta.icon"/>
                        {{ item.meta.name }}
                </el-menu-item>
            </template>
        </template>
    </template>
</template>

<script setup>

// 定义父组件传过来的值
const props = defineProps({
    // 菜单列表
    chil: {
        type: [],
        default: () => [],
    },
});


</script>
