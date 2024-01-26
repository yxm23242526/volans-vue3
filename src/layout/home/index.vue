<template>
	<div class="notice-bar-container layout-pd">
		<el-card shadow="hover" header="更新公告">
        <div> 1. 新增：支持“回车”登录</div>

		</el-card>

    <el-card shadow="hover" header="fixbug" class="mt15">
      <div> 1. fix：查询周报时输入员工保留关键字的问题</div>

    </el-card>

		<el-card shadow="hover" header="专业团队" class="mt15">
      <NoticeBar :scrollable="true" background="#ecf5ff"
                 color="#409eff">
        <el-carousel height="40px" direction="vertical" :autoplay="true" indicator-position="none" :interval="3000">
          <el-carousel-item v-for="v in state.noticeListOne" :key="v" >{{ v }} </el-carousel-item>
        </el-carousel>
      </NoticeBar>
  		</el-card>

		<el-card shadow="hover" header="预计上线功能" class="mt15">
			<NoticeBar :scrollable="true">
				<el-carousel height="40px" direction="vertical" :autoplay="true" indicator-position="none" :interval="3000">
					<el-carousel-item v-for="v in state.noticeListTwo" :key="v" >{{ v }} </el-carousel-item>
				</el-carousel>
			</NoticeBar>
		</el-card>

	</div>
</template>

<script setup name="makeNoticeBar">
import { reactive } from 'vue';
// 引入组件
// 定义变量内容
const state = reactive({
  noticeListOne:[
      '💝💝致力于完成一个完整的OA工作系统，基于Vue3、js、vite、ElementPlus等，欢迎加入',
      '💝💝前端仓库地址：https://gitee.com/yxmloveslife/volans.git',
      '💝💝后端源码请私聊3587'
  ],
	noticeListTwo: [
		'🎉🎉🔥1.标签卡选项按钮',
		'🎉🎉🔥2.主题配色',
    '🎉🎉🔥3.个人中心',
	],
});
</script>
