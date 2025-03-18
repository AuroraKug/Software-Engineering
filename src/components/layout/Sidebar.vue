<template>
  <div class="sidebar-container" v-if="isSidebarVisible">
    <!-- 关闭按钮 -->
    <el-button class="sidebar-close-btn" square size="small" @click="$emit('toggle-sidebar')" >
      <el-icon><Close /></el-icon>
    </el-button>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">

      <el-sub-menu index="1">

        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon>
          <document />
        </el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <setting />
        </el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>

</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
  isSidebarVisible: {
    type: Boolean,
    required: true
  }
})

// 以下方法仅作示例，按需使用
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>

.sidebar-container {
  position: fixed;
  width: 300px;
  height: 100vh; /* 或者用 100% 如果父容器高度已定 */
  background-color: #fff;
  box-sizing: border-box;
}

.sidebar-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}

.el-menu-vertical-demo {
  margin-top: 48px; /* 给关闭按钮留出空间 */
}

/* 关闭按钮放在右上角 */
.sidebar-close-btn {
  position: absolute;
  top: 4px;
  right: 8px;
  z-index: 10;
  width: 28px;  /* 固定宽度 */
  height: 28px; /* 固定高度 */
  min-width: 28px; /* 避免按钮内容影响尺寸 */
  margin-top: 10px;
  margin-right: 5px;
  padding: 4px;
  display: flex;

}
</style>