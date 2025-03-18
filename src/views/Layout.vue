<template>
  <el-container style="min-height: 100vh;" :style="backgroundStyle">
    <!-- 顶部 -->
    <el-header>
      <Header 
        @toggle-sidebar="handleToggleSidebar" 
        @theme-changed="handleThemeChanged" 
      />
    </el-header>

    <!-- 中间主体（侧边 + 内容） -->
    <el-container>
      <el-aside v-if="isSidebarVisible" width="200px">
        <Sidebar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>

    <!-- 底部 -->
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
<script setup>
import { ref, computed } from 'vue'
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Footer from '@/components/layout/Footer.vue'

const collapsed = ref(false)
const theme = ref('default')




const isSidebarVisible = ref(false)

// 切换侧边栏显示状态
const handleToggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}

const handleThemeChanged = (theme) => {
  console.log('当前主题：', theme)
  // 可根据需要切换主题样式
  document.documentElement.setAttribute('data-theme', theme)
}

</script>

<style scoped>
.layout-body { display:flex; flex:1 }
main { flex:1; padding:2rem }
</style>
