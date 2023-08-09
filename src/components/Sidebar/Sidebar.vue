<script setup lang="ts">
import ListLink from './ListLink.vue'
import ProjectLink from './ProjectLink.vue'
import SidebarItem from './SidebarItem.vue'
import { projectsPalette } from '@/assets/projects-palette'

const lists = [
  { id: 'today', name: 'Today' },
  { id: 'week', name: 'This week' },
  { id: 'later', name: 'Later' }
]

const projects: {
  id: string
  name: string
  color: keyof typeof projectsPalette
}[] = [
  { id: '1', name: 'Project 1', color: 'blue' },
  { id: '2', name: 'Project 2', color: 'red' },
  { id: '3', name: 'Project 3', color: 'gray' }
]
</script>

<template>
  <div class="sidebar">
    <!--Lists-->
    <ListLink v-for="list in lists" :key="list.id" :list="list" />
    <!--Projects-->
    <SidebarItem class="projects-title">Projects</SidebarItem>
    <ProjectLink v-for="project in projects" :key="project.id" :project="project" />
  </div>
</template>

<style scoped>
.sidebar {
  width: 256px;
  background-color: var(--sidebar-color);
  padding: 16px;
}

.projects-title {
  margin-top: 16px;
  font-weight: bold;
}
</style>
