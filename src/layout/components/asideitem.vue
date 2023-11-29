<template>
    <template v-for="item in chil">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon" />
                </el-icon>
                {{ item.meta.name }}
            </template>
            <asideitem :chil="item.children" />
        </el-sub-menu>
        <template v-else>
            <el-menu-item :index="item.path" class="nest-menu">
                <RouterLink :to="item.path">
                    <el-icon>
                        <component :is="item.meta.icon" />
                    </el-icon>
                    {{ item.meta.name }}
                </RouterLink>
            </el-menu-item>
        </template>
    </template>
</template>

<script setup lang="ts">

// 定义父组件传过来的值
const props = defineProps({
    // 菜单列表
    chil: {
        type: [],
        default: () => [],
    },
});


</script>
