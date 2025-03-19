<template>
  <el-container class="container" style="min-height: 100vh;" :style="containerStyle">
    <!-- 顶部 -->
    <el-header>
      <Header 
        @toggle-sidebar="handleToggleSidebar" 
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




const collapsed = ref(false)
const theme = ref('default')




const isSidebarVisible = ref(false)

// 切换侧边栏显示状态
const handleToggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
  console.log("Sidebar happen")
}






const backgrounds = {
  simple: 'none',
  natural: 'src/assets/images/natural.png',
  beautify: 'src/assets/images/beautiful.png'
}

const defaultBg = backgrounds.simple
// 定义一个背景样式变量，初始使用默认背景
const backgroundImageUrl = ref(`url(${defaultBg})`)

// 通过 computed 返回内联样式对象
const containerStyle = computed(() => ({
  '--bg-image': backgroundImageUrl.value
}))

// 处理 Header 发出的背景风格切换事件
const handleChangeStyle = (style) => {
  console.log("style-changed:", style)
  
  if (backgrounds[style]) {
    if(backgrounds[style] === "none"){
      backgroundImageUrl.value = 'none'
    }
    backgroundImageUrl.value = `url(${backgrounds[style]})`
  } else {
    backgroundImageUrl.value = 'none'
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
