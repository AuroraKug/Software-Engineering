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



<style scoped>

</style>