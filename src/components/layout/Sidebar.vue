<template>
    <aside :class="{ collapsed }">
      <ul>
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/profile">个人中心</router-link></li>
      </ul>
    </aside>
  </template>
  <script setup>
  import { defineProps } from 'vue'
  const props = defineProps({ collapsed: Boolean })
  </script>
  <style scoped>
  aside { width: 200px; transition: width .2s; }
  aside.collapsed { width: 60px; }
  </style>
  