<template>
  <el-card class="password-change-container">
    <h2>修改密码</h2>
    <el-form ref="formRef" :model="passwordForm" :rules="rules" label-width="100px">
      <el-form-item label="当前密码" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword" type="password" show-password />
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" type="password" show-password />
      </el-form-item>

      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="router.push('/')">取消</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { useChangePasswordService } from '@/api/userProfile';
import { useRouter } from 'vue-router';

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const formRef = ref(null);

const checkPassword = (rule, value, callback) => {
  const hasNumber = /\d/.test(value)
  const hasLetter = /[a-zA-Z]/.test(value)
  if (!hasNumber || !hasLetter) {
    callback(new Error('密码必须包含数字和字母组合'))
  } else {
    callback()
  }
}

const rules = {
  currentPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' },
    {
      min: 6,
      max: 25,
      message: '密码必须包含数字和字母组合，长度为6~25位',
      trigger: 'blur'
    },
    {
      validator: checkPassword,
      trigger: 'blur'
    }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' },{
      min: 6,
      max: 25,
      message: '密码必须包含数字和字母组合，长度为6~25位',
      trigger: 'blur'
    },
    {
      validator: checkPassword,
      trigger: 'blur'
    }],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('新密码和确认密码不匹配！'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};


const router = useRouter()

const handleSubmit = async () => {

  await formRef.value.validate();

  const password_data = {
    oldPassword: passwordForm.value.oldPassword,
    newPassword: passwordForm.value.newPassword,
    confirmPassword: passwordForm.value.confirmPassword
  }
  console.log(password_data)
  try {
    const response = await useChangePasswordService(password_data);
    router.push('/')

  } catch (error) {
    console.log(response)
  }
};





</script>

<style scoped lang="scss">
.password-change-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>