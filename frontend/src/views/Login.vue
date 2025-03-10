<script setup>
import {computed, onMounted, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {User, Lock, Message} from '@element-plus/icons-vue'
import axios from 'axios'
import PasswordQualityCalculator from 'password-quality-calculator';

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
const rememberMe = ref(false) // 是否记忆账号密码
const passwordStrength = ref('')
const isBarShow = ref(true)
const PASSWORD_LEVEL = ref({
  'weak': 64,
  'moderate': 80
})


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
      message: '密码至少为字母与数字组合，长度为6~25位',
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
  isRegister.value = !isRegister.value
  rememberMe.value = false
  accountData.value = {
    email: '',
    code: '',
    username: '',
    userType: 'CUSTOMER',
    password: '',
    rePassword: ''
  }
  passwordStrength.value = ''
}

const register = async () => {
  try {
    await formRef.value.validate()
    const response = await axios.post('/api/auth/register', {
      userType: accountData.value.userType,
      username: accountData.value.username,
      password: accountData.value.password,
      email: accountData.value.email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    ElMessage.success('注册成功！')
    isRegister.value = false
    clearAccount()
  } catch (error) {
    if (error.response?.data?.message) {
      ElMessage.error(`注册失败: ${error.response.data.message}`)
    } else {
      ElMessage.error('注册失败，请稍后重试')
    }
  }
}


const login = async () => {
  try {
    await formRef.value.validate()
    const response = await axios.post('/api/auth/login', {
      username: accountData.value.username,
      password: accountData.value.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    ElMessage.success('登录成功！')
    if (rememberMe.value) {
      localStorage.setItem('savedAccount', JSON.stringify({
        username: accountData.value.username,
        password: accountData.value.password
      }))
    }
  } catch (error) {
    if (error.response?.data?.message) {
      ElMessage.error(`登录失败: ${error.response.data.message}`)
    } else {
      ElMessage.error('登录失败')
    }
  }
}

onMounted(() => {
  const savedAccount = localStorage.getItem('savedAccount')
  if (savedAccount) {
    const data = JSON.parse(savedAccount)
    accountData.value.username = data.username
    accountData.value.password = data.password
    rememberMe.value = true
  }
})

const isPasswordValid = () => {
  return new Promise((resolve) => {
    formRef.value.validateField('password', (isValid) => {
      if (isValid) {
        isBarShow.value = true;
        resolve(true);
      } else {
        isBarShow.value = false;
        resolve(false);
      }
    })
  })
}

const calculatePasswordStrength = async () => {
  const isValid = await isPasswordValid()
  if (!isValid) return

  const passwordStore = PasswordQualityCalculator(accountData.value.password)
  if (passwordStore <= PASSWORD_LEVEL.value.weak) {
    passwordStrength.value = 'weak'
  } else if (passwordStore <= PASSWORD_LEVEL.value.moderate) {
    passwordStrength.value = 'moderate'
  } else {
    passwordStrength.value = 'strong'
  }
  console.log(passwordStrength.value)
}

const strengthText = computed(() => {
  switch (passwordStrength.value) {
    case 'weak':
      return '弱';
    case 'moderate':
      return '中';
    case 'strong':
      return '强';
    default:
      return '';
  }
})


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
            <el-input :prefix-icon="Message" placeholder="请输入邮箱" v-model="accountData.email"></el-input>
          </el-form-item>
          <el-form-item prop="code" style="flex: 1; margin-left: 20px;">
            <el-input placeholder="请输入验证码" v-model="accountData.code"></el-input>
          </el-form-item>
        </div>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入账号名" v-model="accountData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <div class="password-input-wrapper">
            <el-input
                placeholder="请输入密码"
                v-model="accountData.password"
                @input="calculatePasswordStrength"
                :prefix-icon="Lock"
            >
            </el-input>
            <span
                v-show="isBarShow"
                class="strength-text"
                :class="passwordStrength"
            >{{ strengthText }}</span>
          </div>
        </el-form-item>


        <el-form-item prop="rePassword">
          <el-input
              :prefix-icon="Lock"
              placeholder="请确认密码"
              v-model="accountData.rePassword"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="button" @click="register">注册</el-button>
        </el-form-item>
        <el-form-item>
          <div class="hint">
            已有账号？点击
            <el-link
                type="primary"
                :underline="false"
                @click="clearAccount"
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
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="accountData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" placeholder="请输入密码" v-model="accountData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex-box">
            <el-checkbox v-model="rememberMe" @click="">记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <div class="hint">
            还未注册？点击
            <el-link
                type="primary"
                @click="clearAccount"
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

  .password-input-wrapper {
    position: relative;
    width: 100%;

    .strength-text {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 15px;
      z-index: 2;
      pointer-events: none;

      &.weak {
        color: #ff4d4f;
      }

      &.moderate {
        color: #faad14;
      }

      &.strong {
        color: #52c41a;
      }
    }

    .el-input__wrapper {
      padding-right: 60px !important;
    }
  }

}
</style>