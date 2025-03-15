<template>
  <div class="password-change-container">
    <h2>修改密码</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="currentPassword">当前密码：</label>
        <input type="password" id="currentPassword" v-model="currentPassword" required />
      </div>
      <div>
        <label for="newPassword">新密码：</label>
        <input type="password" id="newPassword" v-model="newPassword" required />
      </div>
      <div>
        <label for="confirmPassword">确认新密码：</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit">提交</button>
    </form>
    <div v-if="message" :style="{ color: messageColor, marginTop: '10px' }">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const message = ref('');
const messageColor = ref('');

// 处理表单提交
const handleSubmit = async () => {
  // 验证新密码与确认密码是否一致
  if (newPassword.value !== confirmPassword.value) {
    message.value = '新密码和确认密码不匹配！';
    messageColor.value = 'red';
    return;
  }

  try {
    const response = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value
      })
    });

    const data = await response.json();
    if (response.ok) {
      message.value = data.message || '密码修改成功！';
      messageColor.value = 'green';
    } else {
      message.value = data.error || '密码修改失败！';
      messageColor.value = 'red';
    }
  } catch (error) {
    message.value = '请求异常，请稍后再试。';
    messageColor.value = 'red';
  }
};
</script>

<style scoped lang="scss">
.password-change-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  h2 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    div {
      display: flex;
      flex-direction: column;
    }
    
    label {
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    button {
      padding: 10px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>