<script setup>
import Header from "@/components/layout/Header.vue";
import FilterBarWithSelector from '@/components/shop/FilterBarWithSelector.vue'
import ShopList from "@/components/shop/ShopList.vue";
import PaginationBar from "@/components/shop/PaginationBar.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <Header></Header>
  <FilterBarWithSelector></FilterBarWithSelector>
  <ShopList></ShopList>
  <PaginationBar></PaginationBar>
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

</style>