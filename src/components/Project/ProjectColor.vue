<script setup lang="ts">
import { computed } from 'vue'
import { projectsPalette } from '@/assets/projects-palette'

const props = defineProps<{
  color: keyof typeof projectsPalette
  size?: 'small' | 'large'
}>()

const bgColorCode = computed(() => {
  return projectsPalette[props.color].hex
})
</script>

<template>
  <div class="color-circle" :style="{ backgroundColor: bgColorCode }" :size="props.size" />
</template>

<style scoped>
.color-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-text);
}

.color-circle[size='large'] {
  width: 16px;
  height: 16px;
}
</style>
