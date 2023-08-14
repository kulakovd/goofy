<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import ListLink from './ListLink.vue'
import ProjectLink from './ProjectLink.vue'
import SidebarItem from './SidebarItem.vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const menuStore = useMenuStore()
const { loadMenu } = menuStore
const { titledLists, projects } = storeToRefs(menuStore)

onMounted(() => {
  loadMenu()
})
</script>

<template>
  <div class="sidebar">
    <!--Lists-->
    <ListLink v-for="list in titledLists" :key="list.id" :list="list" />
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
