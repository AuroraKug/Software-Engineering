  <template>
    
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
  