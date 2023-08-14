<script setup lang="ts">
import { projectsPalette } from '@/assets/projects-palette'

const props = defineProps<{
  color: keyof typeof projectsPalette | null
}>()

defineEmits<{
  'update:color': [keyof typeof projectsPalette]
}>()
</script>

<template>
  <div class="color-picker">
    <div class="colors">
      <div
        v-for="color in projectsPalette"
        :key="color.key"
        class="color-wrapper"
        :class="{ selected: color.key === props.color }"
        @click="$emit('update:color', color.key)"
      >
        <div class="color" :style="{ backgroundColor: color.hex }" />
      </div>
    </div>
  </div>
</template>

<style scoped>

.colors {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.color-wrapper {
  padding: 4px;
  border-radius: var(--border-radius);
}

.selected {
  border: 1px solid var(--color-text);
}

.color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
