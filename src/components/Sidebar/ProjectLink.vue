<script setup lang="ts">
import ProjectColor from '@/components/Project/ProjectColor.vue'
import SidebarItem from './SidebarItem.vue'
import { projectsPalette } from '@/assets/projects-palette'

defineProps<{
  project: { id: string; title: string; color: keyof typeof projectsPalette }
}>()
</script>

<template>
  <router-link :to="`/project/${project.id}`">
    <SidebarItem>
      <ProjectColor :color="project.color" />
      {{ project.title }}
    </SidebarItem>
  </router-link>
</template>
