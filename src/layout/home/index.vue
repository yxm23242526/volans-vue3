<template>
	<div class="notice-bar-container layout-pd">
		<el-card shadow="hover" header="专业团队">
			<NoticeBar
				text="🎉🎉🔥作者：1402、1597、3587"
			/>
		</el-card>

		<el-card shadow="hover" header="值得信赖" class="mt15">
			<NoticeBar
				text="年前做出demo"
			/>
		</el-card>

		<el-card shadow="hover" header="未来可期" class="mt15">
			<NoticeBar :scrollable="true">
				<el-carousel height="40px" direction="vertical" :autoplay="true" indicator-position="none" :interval="3000">
					<el-carousel-item v-for="v in state.noticeList" :key="v">{{ v }} </el-carousel-item>
				</el-carousel>
			</NoticeBar>
		</el-card>

	</div>
</template>

<script setup name="makeNoticeBar">
import { reactive } from 'vue';
// 引入组件
import NoticeBar from "@/components/noticeBar/index.vue"

// 定义变量内容
const state = reactive({
	noticeList: [
		'🎉🎉🔥基于vue3 、JavaScript、vite、Element plus等',
		'仓库地址：',
	],
});
</script>
