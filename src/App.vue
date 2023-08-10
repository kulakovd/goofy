<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar/Sidebar.vue'
</script>

<template>
  <div class="app-layout">
    <Sidebar />

    <div class="app-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  align-items: stretch;
  height: 100%;
}

.app-content {
  flex: 1;
}
</style>
