<script setup lang="ts">
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { projectsPalette } from '@/assets/projects-palette'

const props = defineProps<{
  project: { id: string; name: string; color: keyof typeof projectsPalette }
}>()

const bgColorCode = computed(() => {
  return projectsPalette[props.project.color].hex
})
</script>

<template>
  <router-link :to="`/project/${project.id}`">
    <SidebarItem>
      <div class="color-circle" :style="{ backgroundColor: bgColorCode }" />
      {{ project.name }}
    </SidebarItem>
  </router-link>
</template>

<style scoped>
.color-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-text);
  margin-right: 8px;
}
</style>
