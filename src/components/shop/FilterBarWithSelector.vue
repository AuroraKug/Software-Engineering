<script setup>
import {ref, watch} from 'vue'
import {ArrowDown, Operation} from "@element-plus/icons-vue";

defineProps({
  activeFilter: String,
})
const emit = defineEmits(['update:activeFilter'])

const showSelector = ref(false)
const toggleSelector = () => {
  showSelector.value = !showSelector.value
}
const closeSelector = () => {
  showSelector.value = false
}
const selectorFilter = (filter) => {
  emit('update:activeFilter', filter)
}

const handleIconClick = () => {
  toggleSelector()
  selectorFilter('comprehensive')
}

watch(showSelector, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="filter-bar">
      <span
          class="filter-item"
          :class="{active: activeFilter === 'default'}"
          @click="selectorFilter('default')"
      >综合排序</span>
    <el-dropdown @command="selectorFilter">
    <span
        class="el-dropdown-link"
        :class="{active: activeFilter === 'rating-high' || activeFilter === 'rating-low'}"
    >
      评分
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="rating-high">好评优先</el-dropdown-item>
          <el-dropdown-item command="rating-low">差评优先</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown @command="selectorFilter">
    <span
        class="el-dropdown-link"
        :class="{active: activeFilter === 'price-high' || activeFilter === 'price-low'}"
    >
      价格
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="price-high">高价优先</el-dropdown-item>
          <el-dropdown-item command="price-low">低价优先</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-icon
        class="filter-icon"
        :class="{active: activeFilter === 'comprehensive'}"
        @click="handleIconClick"
    >
      <operation></operation>
    </el-icon>

    <div v-if="showSelector" class="selector-mask">
      <div class="selector-content">
        <h3>综合选择器</h3>
        <p>内容</p>
        <el-button type="primary" @click="closeSelector">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  width: 770px;
  height: 40px;
  background-color: white;
  border-radius: 8px;
  margin-top: 10px;
  margin-left: 40px;
  margin-bottom: 2px;
  border: 1px #d9d9d9 solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  transition: color 0.3s ease;
  margin-right: 30px;
}

.el-dropdown-link:hover {
  color: #45a1ff;
}

.el-dropdown-link.active {
  color: #45a1ff;
}

.el-dropdown-link:focus-visible {
  outline: none;
}

.el-icon--right {
  margin-left: 5px;
  color: #999;
  transition: color 0.2s ease;
}

.el-dropdown-link:hover .el-icon--right {
  color: #45a1ff;
}

.el-dropdown-link.active .el-icon--right {
  color: #45a1ff;
}

.filter-item {
  font-size: 14px;
  color: #333;
  margin-right: 30px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.filter-item:hover {
  color: #45a1ff;
}

.filter-item.active {
  color: #45a1ff;
}


.filter-icon {
  font-size: 18px;
  color: #999;
  cursor: pointer;
  margin-left: auto;
  transition: color 0.3s ease;
}

.filter-icon:hover {
  color: #45a1ff;
}

.filter-icon.active {
  color: #45a1ff;
}

.selector-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.selector-content {
  width: 400px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>