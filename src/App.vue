<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar/Sidebar.vue'
</script>

<template>
  <div class="app-layout">
    <Sidebar />

    <div class="app-content">
      <div id="app-teleport"></div>
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
  position: relative;
  flex: 1;
}
.app-teleport {
  position: absolute;
  inset: 0;
}
</style>
