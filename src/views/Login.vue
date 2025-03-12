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
    ElMessage.error('注册失败')
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
    tokenStore.setToken(response.token)
    await router.push('/')
  } catch (error) {
    ElMessage.error('登录失败')
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

/*
* 密码强度验证部分
* */

/*
* 验证码部分
* */

</script>

<template>

</template>

<style scoped lang="scss">

</style>