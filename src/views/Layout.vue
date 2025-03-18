<template>
  <div class="layout-container" :style="backgroundStyle">
    <Header @toggle-sidebar="collapsed = !collapsed" @theme-changed="setTheme" />
    <div class="layout-body">
      <Sidebar :collapsed="collapsed" />
      <main><router-view/></main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Footer from '@/components/layout/Footer.vue'

const collapsed = ref(false)
const theme = ref('default')

const setTheme = (t) => theme.value = t
const backgroundStyle = computed(() => ({
  backgroundImage: `url(/images/${theme.value}-bg.jpg)`,
  backgroundSize: 'cover',
  minHeight: '100vh'
}))
</script>

<style scoped>
.layout-body { display:flex; flex:1 }
main { flex:1; padding:2rem }
</style>
