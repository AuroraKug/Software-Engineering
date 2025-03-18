  <template>
    <div><router-link to="/">首页</router-link></div>
  </template>
  <script setup>
  import { defineProps } from 'vue'
  const props = defineProps({ isSidebarVisible: Boolean })
  </script>
  <style scoped>
  aside { width: 200px; transition: width .2s; }
  aside.collapsed { width: 60px; }
  </style>
  