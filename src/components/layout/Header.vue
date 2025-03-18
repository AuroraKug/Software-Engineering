<template>
  <el-header class="app-header">
    <el-row type="flex" justify="space-between" align="middle">
      <!-- Logo 区域 -->
      <el-col :span="4">
        <div class="logo">Review Hub</div>
      </el-col>
      
      <!-- 导航菜单 -->
      <el-col :span="16">
        <el-menu mode="horizontal" default-active="1">
          <el-menu-item index="1">
            <router-link to="/" class="no-underline">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/reserve" class="no-underline">保留</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/login" class="no-underline">登录</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/user-profile" class="no-underline">个人中心</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>

      

      <!-- 右侧：设置按钮和用户头像（个人中心） -->
      <el-col :span="2" class="header-right">
        <div class="header-controls">
          
          <!-- 用户头像和下拉菜单 -->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-avatar src="https://picsum.photos/40" size="medium"></el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="goToProfile">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="openSettings">设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-button @click="$emit('toggle-sidebar')">
            <el-icon><Operation /></el-icon>
          </el-button>
          <!-- 主题切换组件 -->
          <ThemeSwitcher @theme-changed="$emit('theme-changed', $event)" />
        </div>
      </el-col>
      
      
    </el-row>
  </el-header>

  <!-- 设置弹窗 -->
  <el-dialog title="界面设置" 
   v-model="settingsVisible"
   width="30%"
   
   >
    <div class="settings-content">
      <!-- 预留一些界面设置的按钮 -->
      <el-button type="primary">按钮1</el-button>
      <el-button type="success">按钮2</el-button>
      <el-button type="warning">按钮3</el-button>
    </div>
    <template #footer>
      <el-button @click="settingsVisible = false">取 消</el-button>
      <el-button type="primary" @click="settingsVisible = false">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { Menu , Operation } from '@element-plus/icons-vue'

const settingsVisible = ref(false)

// 打开设置弹窗
const openSettings = () => {
  settingsVisible.value = true
}
</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  padding: 0 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  display: inline-block;
  margin-right: 20px;
}


/* 设置区域按钮和图标对齐 */
.header-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}


/* 去除 router-link 下划线 */
.no-underline {
  text-decoration: none;
  color: inherit;
}

/* 设置弹窗内部样式 */
.settings-content {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
</style>