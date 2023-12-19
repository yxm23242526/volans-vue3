<template>
  <div class="layout-waterfall">
    <div class="layout-comment-container layout-pd">
      <el-card shadow="hover" header="留言">
        <el-scrollbar>
          <div v-for="(comment, index) in comments" :key="index" class="comment-text comment-item">
            <Comment :nickName="comment.nickName"
                     :content="comment.content" :image="comment.image"/>
          </div>
        </el-scrollbar>
      </el-card>
    </div>
    <div class="layout-waterfall-comment layout-pd">
      <el-card header="发送留言">
        <el-input :rows="5" autosize type="textarea"
                  v-model="inputComment" placeholder="请输入评论">
        </el-input>
        <el-button class="mt15" type="primary" @click="onComment"> 评论</el-button>
      </el-card>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useCommentStore} from '@/stores/comment'
import {Session} from '@/utils/storage'
import {ElMessage, ElMessageBox} from "element-plus";

const inputComment = ref('')
const commentStore = useCommentStore()
const comments = ref([])
const userInfo = Session.get('userInfo');
const getAllComments = async () => {
  const res = await commentStore.getComments;
  comments.value = res.data;
}

onMounted(() => {
  getAllComments();
})

const onComment = () => {
  if (inputComment.value === '') {
    ElMessage.error('输入内容不能为空')
  } else {
    ElMessageBox.confirm(
        '是否提交评论？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
    ).then(async () => {
      const nickName = userInfo.nickName;
      const image = userInfo.image;
      await commentStore.addComment({
        inputComment,
        nickName,
        image,
      })
      ElMessage({
        type: 'success',
        message: '提交成功',
      })
    }).catch(() => {
      //什么都不做
    })
  }

  getAllComments()
}
</script>

<style scoped lang="scss">
.layout-waterfall {
  display: flex;

  &-comment {
    flex: 1;
  }
}

.layout-comment-container {
  flex: 3;
}

.comment-text {
  font-size: 14px;
}

.comment-text {
  margin-bottom: 18px;
  border-bottom: 1px solid var(--el-card-border-color);
}


</style>
