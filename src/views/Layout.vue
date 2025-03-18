<template>
  <el-container class="container" style="min-height: 100vh;" :style="containerStyle">
    <!-- 顶部 -->
    <el-header>
      <Header 
        @toggle-sidebar="handleToggleSidebar" 
        @theme-changed="handleThemeChanged" 
        @change-style="handleChangeStyle"
      />
    </el-header>

    <!-- 中间主体（侧边 + 内容） -->
    <el-container>
      <el-aside  width="200px">
        <Sidebar :is-sidebar-visible="isSidebarVisible" @toggle-sidebar="handleToggleSidebar" />
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

import defaultBg from '@/assets/images/default.png'
import bg2 from '@/assets/images/OIP.png'


const collapsed = ref(false)
const theme = ref('default')




const isSidebarVisible = ref(false)

// 切换侧边栏显示状态
const handleToggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
  console.log("Sidebar happen")
}

const handleThemeChanged = (theme) => {
  console.log('当前主题：', theme)
  // 可根据需要切换主题样式
  document.documentElement.setAttribute('data-theme', theme)
}

// 定义一个背景样式变量，初始使用默认背景
const backgroundImageUrl = ref(`url(${defaultBg})`)

// 通过 computed 返回内联样式对象
const containerStyle = computed(() => ({
  '--bg-image': backgroundImageUrl.value
}))


// 通过 Header 上的按钮来切换背景风格
const handleChangeStyle = () => {
  console.log("style-changed")
  // 示例：切换两种背景图片
  if(backgroundImageUrl.value === 'url(src/assets/images/default.png)'){
    backgroundImageUrl.value = 'url(src/assets/images/OIP.png)'
  } else {
    backgroundImageUrl.value = 'url(src/assets/images/default.png)'
  }
}

</script>

<style scoped>
.layout-body { display:flex; flex:1 }
main { flex:1; padding:2rem }

.container {
  position: relative;
  overflow: hidden;
}

/* 伪元素背景层 */
.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-image) no-repeat center center fixed;
  background-size: cover;
  filter: brightness(0.6);  /* 只对背景图片应用滤镜 */
  z-index: -1;
}

.el-header {
  position: fixed;
  padding: 0 ;
  margin: 0 ;
  width: 100vw;
  z-index: 1000;
}

.el-aside{
  position: fixed;
  margin-left: 0 ;
  margin-top: 0px;
  padding: 0;
  z-index: 1100;
}

</style>
