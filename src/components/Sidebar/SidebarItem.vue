<script setup lang="ts"></script>

<template>
  <div class="sidebar-item">
    <slot />
  </div>
</template>

<style scoped>
.sidebar-item {
  font-size: 1em;
  color: var(--color-text);
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  height: 36px;
  border-radius: var(--border-radius);
}

.sidebar-item:active {
  transform: var(--click-effect);
}
</style>
