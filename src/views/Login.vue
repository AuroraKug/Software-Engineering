<script setup>
import {computed, onMounted, ref} from 'vue'
import {useRegisterService, useLoginService, useGetCaptchaService} from "@/api/auth.js"
import {useTokenStore} from "@/stores/token.js"
import router from "@/router/index.js"
import {ElMessage} from "element-plus"
import {User, Lock, Message} from '@element-plus/icons-vue'
import PasswordQualityCalculator from 'password-quality-calculator'


/*
* 创建tokenStore
* */

const tokenStore = useTokenStore()

/*
* 表单验证规则
* */
const checkUsername = (rule, value, callback) => {
  const validCharacters = /^[A-Za-z0-9_]+$/.test(value)
  if (!validCharacters) {
    callback(new Error('用户名只能包含数字、字母和下划线'))
    return
  }
}

const checkPassword = (rule, value, callback) => {
  const hasNumber = /\d/.test(value)
  const hasLetter = /[a-zA-Z]/.test(value)
  if (!hasNumber || !hasLetter) {
    callback(new Error('密码必须包含数字和字母组合'))
  } else {
    callback()
  }
}

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
  captchaValue: [
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
    },
    {
      validator: checkUsername,
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
      message: '密码必须包含数字和字母组合，长度为6~25位',
      trigger: 'blur'
    },
    {
      validator: checkPassword,
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


/*
* 登录与注册部分
* */

const accountData = ref({
  email: '',
  username: '',
  userType: 'Customer',
  password: '',
  rePassword: '',
  captchaToken: '',
  captchaValue: ''
})
const formRef = ref(null)
const isRegister = ref(false)
const rememberMe = ref(false)

onMounted(() => {
  const savedAccount = localStorage.getItem('savedAccount')
  if (savedAccount) {
    const data = JSON.parse(savedAccount)
    accountData.value.username = data.username
    accountData.value.password = data.password
    rememberMe.value = true
  }
  getCaptcha()
})

const register = async () => {
  try {
    await formRef.value.validate()
    await useRegisterService({
      userType: accountData.value.userType,
      username: accountData.value.username,
      password: accountData.value.password,
      email: accountData.value.email,
      captchaToken: accountData.value.captchaToken,
      captchaValue: accountData.value.captchaValue
    })
    jumpToLogin()
  } catch (error) {
    return
  } finally {
    await getCaptcha()
  }
}

const login = async () => {
  try {
    await formRef.value.validate()
    const response = await useLoginService({
      username: accountData.value.username,
      password: accountData.value.password
    })
    if (rememberMe.value) {
      localStorage.setItem('savedAccount', JSON.stringify({
        username: accountData.value.username,
        password: accountData.value.password
      }))
    } else {
      if (localStorage.getItem('savedAccount')) {
        localStorage.removeItem('savedAccount')
      }
    }
    tokenStore.setToken(response.token, response.expiresAt)
    await router.push('/')
  } catch (error) {
    return
  }
}

const clearAccount = () => {
  isRegister.value = !isRegister.value
  rememberMe.value = false
  accountData.value = {
    email: '',
    username: '',
    userType: accountData.value.userType,
    password: '',
    rePassword: '',
    captchaToken: accountData.value.captchaToken,
    captchaValue: ''
  }
  passwordStrength.value = ''
}

const jumpToLogin = () => {
  isRegister.value = !isRegister.value
  accountData.value = {
    email: '',
    username: accountData.value.username,
    userType: accountData.value.userType,
    password: accountData.value.password,
    rePassword: '',
    captchaToken: accountData.value.captchaToken,
    captchaValue: ''
  }
}

const jumpToReset = () => {
  router.push('/change-password')
}

/*
* 密码强度验证部分
* */

const PASSWORD_LEVEL = ref({
  'weak': 64,
  'moderate': 80
})
const passwordStrength = ref('')
const isBarShow = ref(true)
const strengthText = computed(() => {
  switch (passwordStrength.value) {
    case 'weak':
      return '弱'
    case 'moderate':
      return '中'
    case 'strong':
      return '强'
    default:
      return ''
  }
})

const isPasswordValid = () => {
  return new Promise((resolve) => {
    formRef.value.validateField('password', (isValid) => {
      if (isValid) {
        isBarShow.value = true
        resolve(true)
      } else {
        isBarShow.value = false
        resolve(false)
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
}

/*
* 验证码部分
* */

const captchaImage = ref('')

const getCaptcha = async () => {
  const captchaData = await useGetCaptchaService()
  captchaImage.value = `data:image/png;base64,${captchaData.imageBase64}`
  accountData.value.captchaToken = captchaData.token
}

/*
* 非正式代码
* */

</script>

<template>
  <el-row class="login-page">
    <el-col :span="8"></el-col>
    <el-col :span="8" class="form">
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
          <el-form-item style="flex: 1; margin-left: 20px;">
            <img v-if="captchaImage" :src="captchaImage" class="captcha" @click="getCaptcha" alt="captcha">
          </el-form-item>
        </div>
        <div style="display: flex; align-items: center;">
          <el-form-item prop="username" style="flex: 2;">
            <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="accountData.username"></el-input>
          </el-form-item>
          <el-form-item prop="captchaValue" style="flex: 1; margin-left: 20px;">
            <el-input placeholder="请输入验证码" v-model="accountData.captchaValue"></el-input>
          </el-form-item>
        </div>
        <el-form-item prop="password">
          <div class="password-input-wrapper">
            <el-input
                placeholder="请输入密码"
                v-model="accountData.password"
                @input="calculatePasswordStrength"
                :prefix-icon="Lock"
                show-password
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
              show-password
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
          <el-input
              :prefix-icon="Lock"
              placeholder="请输入密码"
              v-model="accountData.password"
              show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex-box">
            <el-checkbox v-model="rememberMe" @click="">记住我</el-checkbox>
            <el-link type="primary" :underline="false" @click="jumpToReset">忘记密码？</el-link>
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

  .captcha {
    width: 100%;
    cursor: pointer;
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