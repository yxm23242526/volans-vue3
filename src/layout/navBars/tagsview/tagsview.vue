<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useTagsViewStore } from '@/stores/tags'
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
const route = useRoute()
//活跃路由
const activeState = ref(route.path)
const tagsViewStore = useTagsViewStore()
const tagsviewState = tagsViewStore.tagsviewState;

//监听路由变化
watch(() => route, ()=>{
    activeState.value = route.path;
},{
    deep: true
})

//活跃标签卡
const isActive = (state) => {
    return state.path === activeState.value
}

//关闭标签卡
const onTagClose = (state) => {
    tagsViewStore.removeState(state.path, activeState.value)
}

//切换标签卡
const onTabChange = (state) => {
    activeState.value = state.path
    tagsViewStore.gotoPage(state.path)
}
</script>

<template>
    <div class="layout-navbars-tagsview">
        <ul class="layout-navbars-tagsview-ul">
            <li class="layout-navbars-tagsview-ul-li"
                v-for="(state, index) in tagsviewState " :key="index"
                :class="{'is-active':isActive(state)}"
                @click="onTabChange(state)"
            >
                <span>
                    {{ state.title }}
                </span>
                <Icon name="Close" class="layout-navbars-tagsview-ul-li-icon layout-icon-active" @click="onTagClose(state)"/> 
            </li>
        </ul>
    </div>
</template>
<style lang="scss">
.layout-navbars-tagsview {
	background-color: var(--el-color-white);
	border-bottom: 1px solid var(--vl-border-color-light);
	position: relative;
	z-index: 4;
	&-ul {
		list-style: none;
		margin: 0;
		padding: 0;
		height: 34px;
		display: flex;
		align-items: center;
		color: var(--el-text-color-regular);
		font-size: 12px;
		white-space: nowrap;
		padding: 0 15px;
		&-li {
			height: 24px;
			line-height: 26px;
			display: flex;
			align-items: center;
			border: 1px solid var(--el-border-color-lighter);
			padding: 0 15px;
			margin-right: 5px;
			border-radius: 2px;
			position: relative;
			z-index: 0;
			cursor: pointer;
			justify-content: space-between;
			&:hover {
				background-color: var(--el-color-primary-light-9);
				color: var(--el-color-primary);
				border-color: var(--el-color-primary-light-5);
			}
			&-iconfont {
				position: relative;
				left: -5px;
				font-size: 12px;
			}
			&-icon {
				border-radius: 100%;
				position: relative;
				height: 14px;
				width: 14px;
				text-align: center;
				line-height: 14px;
				right: -5px;
				&:hover {
					color: var(--el-color-white);
					background-color: var(--el-color-primary-light-3);
				}
			}
			.layout-icon-active {
				display: block;
			}
			.layout-icon-three {
				display: none;
			}
		}
		.is-active {
			color: var(--el-color-white);
			background: var(--el-color-primary);
			border-color: var(--el-color-primary);
			transition: border-color 3s ease;
		}
	}
}
</style>