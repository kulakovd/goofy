<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'secondary' | 'danger'
}>()
</script>

<template>
  <button type="button" class="button" :class="type ?? 'primary'">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 8px 16px;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: bold;
}

.button.primary {
  background-color: var(--primary-color);
  color: white;
}

.button:active {
  transform: var(--click-effect);
}
</style>
