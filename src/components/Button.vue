<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}>()
</script>

<template>
  <button
    type="button" 
    class="button" 
    :class="type ?? 'primary'" 
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
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
