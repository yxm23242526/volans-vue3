<script setup>
import { ref, computed, watch } from 'vue';
import { useTagsViewStore } from '@/stores/tags'
import { useRouter, useRoute } from 'vue-router';
const route = useRoute()
const activeState = ref(route.path)
const tagsViewStore = useTagsViewStore()
const tagsviewState = tagsViewStore.tagsviewState;

//监听路由变化
watch(() => route, ()=>{
    activeState.value = route.path;
},{
    deep: true
})

const onEditTags = (index, action) => {
    if (action == 'remove')
    {
        tagsViewStore.removeState(index)
    }
}
</script>

<template>
    <el-tabs v-model="activeState" type="card" closable @edit="onEditTags">
        <el-tab-pane v-for="(state, index) in tagsviewState" :key="index" :label="state.title"
            :name="state.key" :closable="state.closeable">
        </el-tab-pane>
    </el-tabs>
</template>
<style lang="scss"></style>