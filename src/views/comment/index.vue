<template>
  <div class="layout-comment layout-pd">
    <el-card shadow="hover" header="留言" class="layout-comment-container"
    body-style="flex: 1">
      <el-scrollbar>
        <div v-for="(comment, commentId) in comments" :key="commentId" class="comment-text">
          <Comment :nickName="comment.nickName == null ? comment.userId :comment.nickName"
                   :content="comment.commentContent" :image="comment.image" :time="comment.commentTime"/>
        </div>
      </el-scrollbar>
    </el-card>
    <div class="layout-comment-submit pl15">
      <el-card header="发送留言" shadow="never">
        <el-input :rows="5" autosize type="textarea"
                  v-model="commentContent" placeholder="请输入评论">
        </el-input>
        <el-button class="mt15" type="primary" @click="onComment(addCommentInfo)"> 评论</el-button>
      </el-card>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {Session} from '@/utils/storage'
import {ElMessage, ElMessageBox} from "element-plus";
import {getAllCommentsAPI, insertCommentAPI} from '@/apis/comment'

const commentContent = ref('')
const comments = ref([])
const userInfo = Session.get('userInfo');
const addCommentInfo = ref({
  'userId': userInfo.userId,
  'commentContent': commentContent,
  'commentTime': new Date().toLocaleString()
})
const getAllComments = async () => {
  comments.value = (await getAllCommentsAPI()).data;
}

onMounted(() => {
  getAllComments();
})

const onComment = (addCommentInfo) => {
  console.log(new Date())
  console.log(new Date().toLocaleString())
  if (addCommentInfo.commentContent === '') {
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
      await (insertCommentAPI(addCommentInfo))
      getAllComments()
      ElMessage({
        type: 'success',
        message: '提交成功',
      })
    }).catch(() => {
      //什么都不做
    })
  }
}
</script>

<style scoped lang="scss">
.layout-comment {
  position: absolute;
  height: 100%;
  display: flex;
  flex: 1;
  .layout-comment-container{
    display: flex;
    flex:3;
    height: inherit;
  }
  .layout-comment-submit{
    flex:1;
  }
}


.comment-text {
  flex:1;
  font-size: 14px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--el-card-border-color);
}


</style>
