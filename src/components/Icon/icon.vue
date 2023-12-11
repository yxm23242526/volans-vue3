<!--
 * @Author: yxm
 * @Date: 2023-12-01 15:12:43
 * @Description: 图标类
-->

<template>
  <i class="el-icon" :style="getIconStyle">
    <component :is="getIconName"/>
  </i>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    //图标名称
    name: {
        type: String
    },
    //图标大小
    size: {
        type: Number,
        default: () => 14,
    }
})

const getIconName = computed( () => {
    return props?.name;
})

const getIconStyle = computed( () => {
    return `font-size: ${props.size}px`;
})

</script>

<style>

</style>