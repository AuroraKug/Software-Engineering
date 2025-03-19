<template>
  <el-header class="app-header">
    <el-row type="flex" justify="space-between" align="middle">
      <!-- Sidebar 区域 -->
      <el-col :span="1">
        <el-button class="sidebar-toggle" @click="$emit('toggle-sidebar')">
          <el-icon>
            <Operation />
          </el-icon>
        </el-button>
      </el-col>
      <!-- Logo 区域 -->
      <el-col :span="4">
        <div class="logo">Review Hub</div>
      </el-col>

      <!-- 导航菜单 -->
      <el-col :span="14">
        <el-menu mode="horizontal" default-active="1">
          <el-menu-item index="1">
            <router-link to="/" class="no-underline">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/" class="no-underline">保留</router-link>
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
      <el-col :span="3" class="header-right">
        <div class="header-controls">
          <!-- <el-button class="change-style" @click="$emit('change-style')">
            <el-icon>
              <Operation />
            </el-icon>
          </el-button> -->
          <!-- 用户头像和下拉菜单 -->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-avatar src="https://picsum.photos/40" size="default"></el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToProfile">个人中心</el-dropdown-item>
                <el-dropdown-item @click="openSettings">设置</el-dropdown-item>
                <el-dropdown-item divided @click="$emit('logout')">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>


          <el-dropdown trigger="click" placement="bottom">
            <!-- 纯 Icon+文字、无边框 -->
            <el-button link>样式
              <el-icon>
                <ArrowDown />
              </el-icon>
            </el-button>

            <template #dropdown>
              <el-menu class="side-menu" :menu-trigger="'hover'" :default-active="activeIndex" mode="vertical"
                :collapse="true">
                <el-menu-item index="'1'">Processing Center</el-menu-item>
                <el-sub-menu index="'2'">
                  <template #title>Workspace</template>
                  <el-menu-item index="'2-1'">item one</el-menu-item>
                  <el-menu-item index="'2-2'">item two</el-menu-item>
                  <el-menu-item index="'2-3'">item three</el-menu-item>
                  <el-sub-menu index="'2-4'">
                    <template #title>item four</template>
                    <el-menu-item index="'2-4-1'">item one</el-menu-item>
                    <el-menu-item index="'2-4-2'">item two</el-menu-item>
                    <el-menu-item index="'2-4-3'">item three</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="'3'">
                  <template #title>页面风格</template>
                  <el-menu-item index="'3-1'" @click="changeStyle('simple')">简约</el-menu-item>
                  <el-menu-item index="'3-2'" @click="changeStyle('natural')">自然</el-menu-item>
                  <el-menu-item index="'3-3'" @click="changeStyle('beautify')">美化</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="'4'">Orders</el-menu-item>
              </el-menu>
            </template>
          </el-dropdown>



          <!-- 主题切换组件 -->
          
        </div>
      </el-col>


    </el-row>
  </el-header>

  <!-- 设置弹窗 -->
  <el-dialog title="界面设置" v-model="settingsVisible" width="30%">
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
import { Menu, Operation, ArrowDown } from '@element-plus/icons-vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  activeIndex: {
    type: String,
    default: '1'
  }
})

const emit = defineEmits(['change-style','toggle-sidebar','logout'])

// 定义要触发的事件

const settingsVisible = ref(false)

// 打开设置弹窗
const openSettings = () => {
  settingsVisible.value = true
}

const changeStyle = (style) => {
  // 这里可以做更多处理
  emit('change-style', style)
  console.log('选中的风格：', style)
}



// 你可以直接使用 props.activeIndex，或者通过解构赋值：
const { activeIndex } = props


</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  padding: 0;
  /* 去掉左右留白 */
  margin: 0;
  /* 确保没有外部间距 */
  width: 100vw;
  /* 让 Header 占满整个视口宽度 */
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

.sidebar-toggle {
  margin-left: 10px;
}

.side-menu.el-menu--collapse {
  width: 200px !important;
  /* 根据需要调整宽度 */
}
</style>