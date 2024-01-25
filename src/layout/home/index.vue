<template>
	<div class="notice-bar-container layout-pd">
		<el-card shadow="hover" header="更新公告">
      <div> 1. 新增：输入工时时，限制为正整数和1位小数</div>
      <div> 2. 新增：管理员任务管理模块</div>
      <div> 3. 新增：导出周报新增“星期”字段</div>
      <div> 4. 调整左侧导航栏顺序，按使用频率摆放</div>
		</el-card>

    <el-card shadow="hover" header="fixbug" class="mt15">
      <div> 1. fix：新增项目时页面不刷新</div>
      <div> 2. fix：右上角图标不对齐</div>
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
