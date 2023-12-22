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
  },
  time: {
    type: Date
  }
})

</script>

<template>
  <div class="comment-container">
    <div class="comment-aside">
      <el-avatar class="comment-aside-image" :size="80" shape="square" :src="image"/>
      <div class="comment-aside-name" style="text-align: center"> {{ nickName }}</div>
    </div>
    <div class="comment-body">
      <div class="comment-body-text">{{ content }}</div>
      <div class="comment-body-time">{{ time }}</div>
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  display: flex;
  border-radius: 4px;
  border: 1px solid var(--vl-border-color-light);
}

.comment-aside {
  margin: 10px 0;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.comment-aside-name {
  margin: 5px;
}

.comment-body {
  padding: 10px;
  border-left: 1px solid var(--vl-border-color-light);
  flex: 4;
  display: block;
}

.comment-body-text {
  font-size: 17px;
  font-family: 黑体;
  min-height: 80px;
}

.comment-body-time {
  color: #cccccc;
  text-align: end;
}

</style>