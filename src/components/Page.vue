<script setup lang="ts"></script>

<template>
  <main>
    <div class="page">
      <slot />
    </div>
  </main>
</template>

<style scoped>
main {
  overflow-y: auto;
  max-height: 100%;
}

.page {
  padding: 24px;
  margin: 0 auto;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  align-items: flex-start;
}
</style>
