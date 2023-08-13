<script setup lang="ts"></script>

<template>
  <div class="drag-icon">
    <div class="drag-icon-dot" />
    <div class="drag-icon-dot" />
    <div class="drag-icon-dot" />
    <div class="drag-icon-dot" />
    <div class="drag-icon-dot" />
    <div class="drag-icon-dot" />
  </div>
</template>

<style scoped>
.drag-icon {
  display: grid;
  grid-template-columns: repeat(2, 4px);
  gap: 2px;
  width: 100%;
}

.drag-icon-dot {
  border-radius: 4px;
  width: 4px;
  height: 4px;
  background-color: rgb(110, 110, 110);
}
</style>
