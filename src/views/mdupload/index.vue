<script setup>


//上传markdown图片
import { uploadMDAPI } from "@/apis/markdown";
import {ElMessage} from "element-plus";
import {ref} from "vue";

const mdUrl = ref('')
const uploadImage = async (params) => {
  const res = await uploadMDAPI(params)
  if (res.code === 200)//上传markdown图片
  {
    mdUrl.value = res.data
    ElMessage({type: 'success', message: '上传成功'})
  }
}
</script>

<template>
  <div class="layout-padding">
    <div class="layout-padding-view layout-padding-auto layout-pd">
      <el-upload
          action=""
          :limit="1"
          :show-file-list="false"
          :http-request="uploadImage"
      >
        <el-button type="primary">上传图片</el-button>
      </el-upload>
      <div class="mt15">
      <el-image style="width: 600px; height: 500px" :src="mdUrl" />
      <p class="mt15"> 当前图片地址：{{mdUrl}}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>