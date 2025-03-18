<template>
    <div class="theme-switcher">
      <button @click="selectTheme('default')">默认主题</button>
      <button @click="selectTheme('dark')">暗黑主题</button>
      <button @click="selectTheme('dynamic')">动态主题</button>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['theme-changed'])
  
  const selectTheme = (theme) => {
    emit('theme-changed', theme)
  }
  </script>
  
  <style scoped>
  .theme-switcher button {
    margin-right: 10px;
  }
  </style>
  