<!-- 测试专用组件 -->
<template>
  <div>
  </div>
</template>

<script setup>
import { useRoute} from "vue-router";
const route = useRoute()
const index = route.params.id
</script>

<style>
</style>