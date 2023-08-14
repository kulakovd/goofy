<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import ListLink from './ListLink.vue'
import ProjectLink from './ProjectLink.vue'
import SidebarItem from './SidebarItem.vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const listsStore = useListsStore()
const { loadLists } = listsStore
const { titledLists, projects } = storeToRefs(listsStore)

onMounted(() => {
  loadLists()
})

const router = useRouter()

function createProject() {
  const newProject = listsStore.createProject()
  router.push(`/project/${newProject.id}`)
}
</script>

<template>
  <div class="sidebar">
    <!--Lists-->
    <ListLink v-for="list in titledLists" :key="list.id" :list="list" />
    <!--Projects-->
    <SidebarItem class="projects-title">
      Projects
      <button class="new-project" @click="createProject">+</button>
    </SidebarItem>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.new-project {
  all: unset;
  padding-inline: 8px;
  border-radius: var(--border-radius);
}
</style>
