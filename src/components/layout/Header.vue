<template>
    <header class="app-header">
      <div class="logo">My App</div>
      <nav>
        <button @click="$emit('toggle-sidebar')">☰</button>
        <ThemeSwitcher @theme-changed="$emit('theme-changed', $event)" />
      </nav>
    </header>
  </template>
  <script setup>
  import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
  </script>
  <style scoped>
  .app-header { display: flex; justify-content: space-between; padding:1rem; }
  </style>
  