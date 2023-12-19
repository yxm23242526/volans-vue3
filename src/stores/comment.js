/**
 * @Description: 留言意见系统
 * @Author: yxm
 * @Date: 2023-12-19
 */
import {defineStore} from "pinia";
import {ref} from 'vue'
import {getAllComments, insertComment} from "@/apis/comment";

export const useCommentStore = defineStore('comment', () => {
    const comments = ref([])
    
    
    //获取所有留言
    const getComments = async () => {
        const res = await getAllComments()
        comments.value = res.data
    }
    
    //添加一条留言
    const addComment = async (data) => {
        const res = await insertComment(data)
        comments.value.push(...res);
    }
    
    return {
        comments,
        getComments,
        addComment
    }
})