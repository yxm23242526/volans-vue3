<script setup>
import { ref, reactive } from 'vue'
import { validateAccount, validatePassword } from '@/utils/validate'
import { useUserStore } from '@/stores/user'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
//自定义校验账户规则
const validate_account_rules = (rule, value, callback) => {
    if (validateAccount(value)) {
        callback()
    }
    else {
        callback(new Error('账号格式不正确'))
    }
}

//自定义校验密码规则
const validate_password_rules = (rule, value, callback) => {
    if (validatePassword(value)) {
        callback()
    }
    else {
        callback(new Error('密码格式不正确'))
    }
}

//表单对象
const form = reactive({
    account: 'admin',
    password: '123456',
})

const formRules = {
    account: [
        { required: true, validator: validate_account_rules, trigger: 'blur' }
    ],
    password: [
        { required: true, validator: validate_password_rules, trigger: 'blur' }
    ]
}

// 获取form实例做统一校验
const formRef = ref(null)
const userStore = useUserStore()

const doLogin = () => {
    const { account, password } = form;
    formRef.value.validate(async (valid) => {
        if (valid) {
            await userStore.getUserInfo({ account, password })
            // 1. 提示用户
            ElMessage({ type: 'success', message: '登录成功' })
            // 2. 跳转首页
            //使用router.push方法导航到不同的 URL。这个方法会向history栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL。
            //使用router.replace方法导航到不同的 URL。这个方法会在history栈替换历史记录。
            router.replace({ path: '/' })
        }
    })
}

</script>

<template>
    <div>
        <!-- 语义标签 -->
        <header class="login-header">
            <div class="container"> 
                <div class="logo">这是一个logo</div>
                <h1>OA工作系统</h1>
                <div class="logo">这也是一个logo</div>
            </div>
        </header>
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a>账户登录</a>
                </nav>
                <!-- 账户登录主体box -->
                <div class="account-box">
                    <div class="form">
                        <el-form :model="form" :rules="formRules" ref="formRef">
                            <el-form-item label="账户" prop="account">
                                <el-input v-model="form.account" />
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="form.password" />
                            </el-form-item>
                            <el-form-item>
                                <el-button class="subBtn" type="primary" @click="doLogin"> 登录 </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>

        </section>
        <footer class="login-footer">
           <div class="container">
            <p>
                <a href="">加入我们！</a>
                <a href="">帮帮我们！</a>
            </p>
           </div>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end; //对齐方式 Y轴
        justify-content: space-between; //对齐方式 X轴
    }

    .logo {
        width: 200px;
        height: 132px;
        border: 1px solid red;
    }
    h1 {
        text-align: center;
        font-size: 60px;
    }
}

.login-section {
    // background: url('@/assets/images/bg.jpg') no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        width: 380px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 104px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }

        .account-box {
            .form {
                padding: 0 30px 30px 30px;

                &-item {
                    margin-bottom: 28px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;
                }
            }

            .subBtn {
                width: 100%;
                color: #fff;
            }
        }
    }
    
    
}

.login-footer {
        padding: 30px 0 50px;
        background: #fff;
        p {
            text-align: center;
            color: #999;
            padding-top: 20px;

            a {
                line-height: 1;
                padding: 0 10px;
                color: #999;
                display: inline-block;
                text-decoration: none;
                ~a {
                    border-left: 1px solid #ccc;
                }
            }
        }
    }
</style>