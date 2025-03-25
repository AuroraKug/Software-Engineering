<script setup>
import {ref} from "vue";

const maximumItemsPerPage = ref(10)

</script>

<template>
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
</template>

<style scoped>
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
</style>