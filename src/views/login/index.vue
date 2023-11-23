<script setup>
import { ref, reactive } from 'vue'
import { validateAccount, validatePassword } from '@/utils/validate'
import { useUserStore} from '@/stores/user'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
//自定义校验账户规则
const validate_account_rules = (rule, value, callback) => {
    if (validateAccount(value)){
        callback()
    }
    else{
        callback(new Error('账号格式不正确'))
    }
}

//自定义校验密码规则
const validate_password_rules = (rule, value, callback) => {
    if (validatePassword(value)){
        callback()
    }
    else{
        callback(new Error('密码格式不正确'))
    }
}

//表单对象
const form = reactive({
    account: 'admin',
    password: '123456',
})

const formRules = {
    account:[
        {required:true, validator:validate_account_rules, trigger:'blur'}
    ],
    password:[
        {required:true, validator:validate_password_rules, trigger:'blur'}
    ]
}

// 获取form实例做统一校验
const formRef = ref(null)
const userStore = useUserStore()

const doLogin = () => {
    const {account, password} = form;
    formRef.value.validate(async (valid) => {
        if (valid){
            await userStore.getUserInfo({account, password})
            // 1. 提示用户
            ElMessage({ type: 'success', message: '登录成功' })
            // 2. 跳转首页
            //使用router.push方法导航到不同的 URL。这个方法会向history栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL。
            //使用router.replace方法导航到不同的 URL。这个方法会在history栈替换历史记录。
            router.replace({path: '/'})
        }
    })
}

</script>

<template>
    <div>
        <!-- 语义标签 -->
        <header class="login-header">
            <div> 这是登录页的header </div>
        </header>
        <section class="login-body">
            <!-- 账户登录主体box -->
            <div class="account-box">
                <div class="form">
                    <el-form :model="form" :rules="formRules" ref="formRef">
                        <el-form-item label="账户" prop="account">
                            <el-input v-model="form.account"/>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="form.password"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login-button" type="primary" @click="doLogin"> 登录 </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <footer class="login-footer">
            <div> 这是登录页的footer </div>
        </footer>
    </div>
</template>

<style scoped>
/* 假样式，为了显示区域 */
.login-header{
    height: 100px;
    border: 1px solid yellow;
}
.login-body{
    height: 700px;
    border: 1px solid red;
}
.login-footer{
    height: 100px;
    border: 1px solid blue;
}
</style>