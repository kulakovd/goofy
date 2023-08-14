<script setup lang="ts">
import SidebarLink from './SidebarLink.vue';
import ProjectColor from '@/components/Project/ProjectColor.vue';
import { projectsPalette } from '@/assets/projects-palette'

defineProps<{
  project: { id: string; title: string; color: keyof typeof projectsPalette }
}>()
</script>

<template>
  <SidebarLink :to="`/project/${project.id}`">
    <ProjectColor :color="project.color" />
    {{ project.title }}
  </SidebarLink>
</template>
