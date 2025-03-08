<script setup>
import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {userRegisterService, userLoginService} from '@/api/user.js'

const isRegister = ref(true) // 用于切换注册与登录表单的显示
const accountData = ref({ // 必要的账号数据
  email: '',
  code: '',
  username: '',
  userType: 'Customer',
  password: '',
  rePassword: ''
})
const formRef = ref(null) // 表单引用

const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (value !== accountData.value.password) {
    callback(new Error('请确保两次输入密码相同'))
  } else {
    callback()
  }
}

const validateEmail = (rule, value, callback) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (value === '') {
    callback(new Error('邮箱不能为空'))
  } else if (!regex.test(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}

const rules = {
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: 'blur'
    },
    {
      validator: validateEmail,
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码长度为6位',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 6,
      message: '验证码长度为6位',
      trigger: 'blur'
    }
  ],
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 16,
      message: '用户名长度为5~16位',
      trigger: 'blur'
    }
  ],
  userType: [
    {
      required: true,
      message: '请选择用户类型',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 25,
      message: '密码长度为6~25位',
      trigger: 'blur'
    }
  ],
  rePassword: [
    {
      validator: checkRePassword,
      trigger: 'blur'
    }
  ]
}

const clearAccount = () => {
  accountData.value = {
    email: '',
    code: '',
    username: '',
    userType: 'Customer',
    password: '',
    rePassword: ''
  }
}

const register = async () => {
  try {
    let result = await userRegisterService(accountData)
    ElMessage.success(result.msg ? result.msg : '注册成功')
    clearAccount()
  } catch (error) {
    ElMessage.error('注册失败，请稍后再试')
  }
}

const login = async () => {
  try {
    let result = await userLoginService(accountData)
    ElMessage.success(result.msg ? result.msg : '登录成功')
    clearAccount()
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
  }
}

const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      if (isRegister.value) {
        register()
      } else {
        login()
      }
    } else {
      if (isRegister.value) {
        ElMessage.error('注册失败')
      }else {
        ElMessage.error('无法登录，请检查账号密码')
      }
      return false
    }
  })
}

</script>

<template>
  <el-row class="login-page">
    <el-col :span="8"></el-col>
    <el-col :span="8" offset="4" class="form">
      <!-- 注册表单 -->
      <el-form
          v-if="isRegister"
          :model="accountData"
          :rules="rules"
          ref="formRef"
      >
        <el-form-item>
          <div class="header-info">注册</div>
        </el-form-item>
        <div style="display: flex; align-items: center;">
          <el-form-item prop="email" style="flex: 2;">
            <el-input placeholder="请输入邮箱" v-model="accountData.email"></el-input>
          </el-form-item>
          <el-form-item prop="code" style="flex: 1; margin-left: 20px;">
            <el-input placeholder="请输入验证码" v-model="accountData.code"></el-input>
          </el-form-item>
        </div>
        <el-form-item prop="username">
          <el-input placeholder="请输入账号名" v-model="accountData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="accountData.password"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input placeholder="请确认密码" v-model="accountData.rePassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button" @click="submitForm">注册</el-button>
        </el-form-item>
        <el-form-item>
          <div class="hint">
            已有账号？点击
            <el-link
                type="primary"
                :underline="false"
                @click="isRegister=false"
            >登录
            </el-link>
          </div>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
          v-else
          :model="accountData"
          :rules="rules"
          ref="formRef"
      >
        <el-form-item>
          <div class="header-info">登录</div>
        </el-form-item>
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="accountData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="accountData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex-box">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button" @click="submitForm">登录</el-button>
        </el-form-item>
        <el-form-item>
          <div class="hint">
            还未注册？点击
            <el-link
                type="primary"
                @click="isRegister=true"
                :underline="false"
            >注册
            </el-link>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
  }

  .header-info {
    margin: auto;
    font: 2em "Fira Sans", sans-serif;
    font-weight: bold;
  }

  .button {
    margin: auto;
    width: 63%;
  }

  .hint {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .flex-box {
    margin: auto;
    width: 63%;
    display: flex;
    justify-content: space-between;
  }

}
</style>