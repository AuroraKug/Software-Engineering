<script setup>
import {onUnmounted, ref, watch} from 'vue'
import {ArrowDown, Operation} from '@element-plus/icons-vue'
import Footer from "@/components/layout/Footer.vue";
import Header from "@/components/layout/Header.vue";

const maximumItemsPerPage = ref(10)
const showSelector = ref(false)
const activeFilter = ref('')

const toggleSelector = () => {
  showSelector.value = !showSelector.value
}

const selectorFilter = (filter) => {
  activeFilter.value = filter
}

watch(showSelector, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Header></Header>

  <div v-if="showSelector" class="selector-mask">
    <div class="selector-content">
      <h3>综合选择器</h3>
      <p>内容</p>
      <el-button type="primary" @click="toggleSelector">关闭</el-button>
    </div>
  </div>

  <div class="container">
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

      <el-dropdown>
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
          @click="toggleSelector"
      >
        <operation></operation>
      </el-icon>

    </div>
    <div class="shop-list">
      <ul>
        <li v-for="item in maximumItemsPerPage" :key="item" class="shop-item">
          <div class="shop-card">
            <div class="shop-image">
              <img src="@/assets/images/natural.png" alt="image" class="image-placeholder">
            </div>
            <div class="shop-content">
              <h3 class="shop-title">[标题]</h3>
              <div class="shop-rating">
                <span class="stars">[评分]</span>
                <span class="sales">[销量]</span>
                <span class="price">[价格]</span>
              </div>
              <div class="shop-tags">
                <span class="tag">[标签1]</span>
                <span class="tag">[标签2]</span>
              </div>
              <p class="shop-description">[描述]</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="pagination-bar">
        <el-pagination background layout="prev, pager, next" :total="100" />
    </div>
  </div>
  <Footer></Footer>
</template>

<style>
ul, ol, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}

img {
  vertical-align: middle;
  border: 0;
}

body, html {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
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

.container {
  width: 100%;
}

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

.filter-bar .el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  transition: color 0.3s ease;
  margin-right: 30px;
}

.filter-bar .el-dropdown-link:hover {
  color: #45a1ff;
}

.filter-bar .el-dropdown-link.active {
  color: #45a1ff;
}

.filter-bar .el-dropdown-link:focus-visible {
  outline: none;
}

.filter-bar .el-icon--right {
  margin-left: 5px;
  color: #999;
  transition: color 0.2s ease;
}

.filter-bar .el-dropdown-link:hover .el-icon--right {
  color: #45a1ff;
}

.filter-bar .el-dropdown-link.active .el-icon--right {
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

.shop-list {
  width: 840px;
  margin-left: 40px;
}

.shop-list ul {
  width: 800px;
  margin-left: 0;
}

.shop-item {
  width: 100%;
  margin-bottom: 2px;
}

.shop-card {
  background-color: #fff;
  border: 1px #d9d9d9 solid;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 15px;
  transition: transform 0.2s ease;
}

.shop-card:hover {
  transform: translateY(-2px);
}

.shop-image {
  width: 150px;
  height: 100px;
  margin-right: 15px;
  background-color: #f0f0f0;
  flex-shrink: 0;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop-content {
  flex: 1;
}

.shop-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 8px;
  color: #333;
}

.shop-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.stars {
  color: #ff4d4f;
}

.sales {
  color: #999;
}

.price {
  color: #ff4d4f;
  font-weight: bold;
}

.shop-tags {
  display: flex;
  gap: 5px;
  margin-bottom: 8px;
}

.tag {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.shop-description {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.pagination-bar {
  width: 800px;
  height: 50px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 40px;
  margin-bottom: 20px;
}

:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next),
:deep(.el-pagination .el-pager li) {
  background-color: #f0f0f0;
}

:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next),
:deep(.el-pagination .el-pager li) {
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>