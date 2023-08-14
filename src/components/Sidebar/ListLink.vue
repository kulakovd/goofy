<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks';
import SidebarLink from './SidebarLink.vue'

const props = defineProps<{
  list: { id: string; title: string }
}>()

const tasksStore = useTasksStore()

function onDrop() {
  tasksStore.putDraggingTaskToList(props.list.id)
}
</script>

<template>
  <SidebarLink :to="`/list/${list.id}`" @drop="onDrop">
    {{ list.title }}
  </SidebarLink>
</template>
