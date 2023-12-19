<script setup>
import {ref, computed} from 'vue'

const props = defineProps({
  image: {
    type: String,
  },
  nickName: {
    type: String,
  },
  content: {
    type: String
  }
})

const now = computed(() => {
      return new Date().toLocaleString()
    }
)
</script>

<template>
  <div class="comment-container pl10">
    <div class="comment-header">
      <el-avatar size="small" :src="image"/>
      <div class="ml10"> 名称{{ nickName }}</div>
    </div>
    <div class="comment-body">
      正文内容{{ content }}
    </div>
    <div class="comment-footer">
      {{ now }}
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  border-radius: 4px;
  border: 1px solid var(--vl-border-color-light);
}

.comment-header {
  display: flex;
}
.comment-body{
  height: 80px;
}
</style>