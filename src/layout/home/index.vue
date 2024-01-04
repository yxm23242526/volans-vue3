<template>
	<div class="notice-bar-container layout-pd">
		<el-card shadow="hover" header="专业团队">
			<NoticeBar
				text="🔥 🔥 致力于完成一个完整的OA工作系统，基于Vue3、js、vite、ElementPlus等，欢迎加入"
			/>
		</el-card>

		<el-card shadow="hover" header="代码地址" class="mt15">
			<NoticeBar
				text="🔥 🔥 前端开源仓库地址：https://gitee.com/yxmloveslife/volans.git  后端源码请私聊3587"
        background="#ecf5ff"
        color="#409eff"
			/>
  		</el-card>

		<el-card shadow="hover" header="预计上线功能" class="mt15">
			<NoticeBar :scrollable="true">
				<el-carousel height="40px" direction="vertical" :autoplay="true" indicator-position="none" :interval="3000">
					<el-carousel-item v-for="v in state.noticeList" :key="v" >{{ v }} </el-carousel-item>
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
	noticeList: [
		'🎉🎉🔥1.标签卡选项按钮',
		'🎉🎉🔥2.主题配色',
    '🎉🎉🔥3.个人中心',
	],
});
</script>
