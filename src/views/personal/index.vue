<script setup>
import {ref, reactive, onMounted} from "vue";
import {Session} from '@/utils/storage'
import {validatePassword} from "@/utils/validate";
import {ElMessage, ElMessageBox} from "element-plus";
import {useUserStore} from "@/stores/user";

const userInfo = ref({})
const imageUrl = ref('');

const form = reactive({
  personalstate: {
    userId: '',
    nickName: '',
    signature: '',
    password: '',
    groupId: '',
  }
})

onMounted(() => {
  userInfo.value = Session.get('userInfo');
  imageUrl.value = userInfo.value.image;
  form.personalstate.userId = userInfo.value.userId;
  form.personalstate.nickName = userInfo.value.nickName;
  form.personalstate.signature = userInfo.value.signature;
  form.personalstate.password = userInfo.value.password;
  form.personalstate.groupId = userInfo.value.groupId;
})
// 获取form实例做统一校验
const formRef = ref(null)
const userStore = useUserStore()

//更新用户信息
const onUpdate = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      ElMessageBox({
        title: '提示',
        message: '此操作将修改个人信息, 是否继续?',
        showCancelButton: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '修改中';
            setTimeout(() => {
              ElMessage({type: 'success', message: '修改成功'})
              done();
            }, 700)
            // 1. 提示用户
          } else {
            done();
          }
        },
      }).then(async () => {
        await userStore.updateUserInfo(form.personalstate)
      })
          .catch(() => {
          });
    } else {
      //这里以后可以做定位到具体错误
      ElMessage({type: 'error', message: '存在不合法信息'})
    }
  })
}

const validate_password_rules = (rule, value, callback) => {
  if (validatePassword(value)) {
    callback()
  } else {
    callback(new Error('密码格式不正确'))
  }
}

const formRules = {
  password: [
    {required: true, validator: validate_password_rules, trigger: 'blur'}
  ]
}

//默认激活的tabpane
const activeTabpane = ref('board')

const headers = ref({
  Authorization: `Bearer ${Session.get('token')}`,
  token: `Bearer ${Session.get('token')}`,
})


//更新头像
const uploadImage = async (params) => {
  const formData = new FormData();
  formData.append('file',params.file)
  const res = await userStore.uploadUserImage(formData)
  if (res.code === 200)//头像替换成功
  {
    await userStore.refreshUserInfo()
    userInfo.value = Session.get('userInfo')
    imageUrl.value = userInfo.value.image;
  }
}


// 定义变量内容
const state = reactive({
  noticeList: [
    '✋此模块仍在开发中✋',
  ],
});
</script>

<template>
  <div class="layout-padding">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover" class="personal-user">
          <el-row>
            <el-col class="personal-user-avator">
              <el-avatar :size="90" :src="imageUrl"/>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="personal-user-name"> {{ userInfo.userName }}</el-col>
          </el-row>
          <el-row>
            <el-col class="personal-user-signature"> {{ userInfo.signature }}</el-col>
          </el-row>
          <el-row>
            <el-col class="personal-user-item pt35" :span="8">
              <div>
                <Icon name="Watermelon"/>
              </div>
              <div> 昵称：</div>
            </el-col>
            <el-col class="personal-user-item-content pt35" :span="8"> {{ userInfo.nickName }}</el-col>
          </el-row>
          <el-row>
            <el-col class="personal-user-item" :span="8">
              <div>
                <Icon name="User"/>
              </div>
              <div> 工号：</div>
            </el-col>
            <el-col class="personal-user-item-content" :span="8"> {{ userInfo.userId }}</el-col>
          </el-row>
          <el-row>
            <el-col class="personal-user-item" :span="8">
              <div>
                <Icon name="OfficeBuilding"/>
              </div>
              <div> 部门：</div>
            </el-col>
            <el-col class="personal-user-item-content" :span="8"> Office产品研发部</el-col>
          </el-row>
          <el-row>
            <el-col class="personal-user-item" :span="8">
              <div>
                <Icon name="Guide"/>
              </div>
              <div>组别：</div>
            </el-col>
            <el-col class="personal-user-item-content" :span="8"> {{ userInfo.departmentId }}</el-col>
          </el-row>
          <el-row>
            <el-col class="personal-user-item" :span="8">
              <div>
                <Icon name="PriceTag"/>
              </div>
              <div>小组：</div>
            </el-col>
            <el-col class="personal-user-item-content" :span="8"> {{ userInfo.groupId }}</el-col>
          </el-row>
<!--          <el-row>-->
<!--            <el-col class="personal-user-item" :span="8">-->
<!--              <div>-->
<!--                <Icon name="MagicStick"/>-->
<!--              </div>-->
<!--              <div>功能域：</div>-->
<!--            </el-col>-->
<!--            <el-col class="personal-user-item-content" :span="13"> 功能域1、功能域2、功能域3、功能域4、功能域5等</el-col>-->
<!--          </el-row>-->
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card shadow="hover" style="height: 500px">
          <template #default>
            <el-tabs v-model="activeTabpane">
<!--              <el-tab-pane label="看板" name="board"></el-tab-pane>-->
<!--              <el-tab-pane label="基础信息" name="basicInfo">-->
<!--                <el-form-->
<!--                    label-position="left"-->
<!--                    label-width="100px"-->
<!--                    style="max-width: 460px"-->
<!--                    :model="form.personalstate"-->
<!--                    :rules="formRules"-->
<!--                    ref="formRef"-->
<!--                >-->
<!--                  <el-form-item label="个性签名">-->
<!--                    <el-input :placeholder="userInfo.signature" v-model="form.personalstate.signature"></el-input>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="昵称">-->
<!--                    <el-input :placeholder="userInfo.nickName" v-model="form.personalstate.nickName"></el-input>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="小组">-->
<!--                    <el-select :placeholder="userInfo.groupId" v-model="form.personalstate.groupId">-->
<!--                      <el-option label="model" value="1"/>-->
<!--                      <el-option label="控制" value="2"/>-->
<!--                    </el-select>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="密码">-->
<!--                    <el-input style="width: 250px" type="password" :placeholder="userInfo.password"-->
<!--                              v-model="form.personalstate.password" show-password></el-input>-->
<!--                    &lt;!&ndash;              <span class="form-item-tipbox ml5" v-show="userInfo.password === form.personalstate.password"> * </span>&ndash;&gt;-->
<!--                  </el-form-item>-->
<!--                  <el-form-item>-->
<!--                    <el-button type="primary" @click="onUpdate">-->
<!--                      更新个人信息-->
<!--                    </el-button>-->
<!--                  </el-form-item>-->
<!--                </el-form>-->

<!--              </el-tab-pane>-->
              <el-tab-pane label="头像" name="photo">
                <div style="text-align: center;">
                  <el-upload
                      action=""
                      :limit="1"
                      :show-file-list="false"
                      :http-request="uploadImage"
                  >
                    <img title="点击修改用户头像" :src="userInfo.image"
                         style="height: 200px; width: 200px; border-radius: 50px;">
                  </el-upload>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-card>
      </el-col>

      <el-col>
        <el-card shadow="hover" header="消息通知" class="mt15">
          <NoticeBar :scrollable="true">
            <el-carousel height="40px" direction="vertical" :autoplay="true" indicator-position="none" :interval="3000">
              <el-carousel-item v-for="v in state.noticeList" :key="v">{{ v }}</el-carousel-item>
            </el-carousel>
          </NoticeBar>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped langs="scss">

.personal-user {
  height: 500px;

  :deep(.el-col) {
    padding-top: 10px;
  }
}

.personal-user-avator {
  text-align: center;
}

.personal-user-name {
  text-align: center;
  font-size: 25px;
}

.personal-user-signature {
  text-align: center;
}

.personal-user-item {
  padding-left: 50px;
  display: flex;

  :deep(i) {
    margin-top: 3px;
    margin-right: 3px;
  }
}


</style>