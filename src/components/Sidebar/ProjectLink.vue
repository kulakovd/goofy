<script setup lang="ts">
import SidebarLink from './SidebarLink.vue'
import ProjectColor from '@/components/Project/ProjectColor.vue'
import { projectsPalette } from '@/assets/projects-palette'
import { useTasksStore } from '@/stores/tasks';

const props = defineProps<{
  project: { id: string; title: string; color: keyof typeof projectsPalette }
}>()

const tasksStore = useTasksStore()

function onDrop() {
  tasksStore.putDraggingTaskToList(props.project.id)
}
</script>

<template>
  <SidebarLink :to="`/project/${project.id}`" @drop="onDrop">
    <ProjectColor :color="project.color" />
    {{ project.title }}
  </SidebarLink>
</template>
