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
  background-color: var(--color-secondary-button-bg);
  color: var(--color-text);
}

.button.primary {
  background-color: var(--color-primary);
}

.button:active {
  transform: var(--click-effect);
}
</style>
