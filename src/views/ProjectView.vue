<script setup lang="ts">
import Page from '@/components/Page.vue'
import TaskList from '@/components/Task/TaskList.vue'
import ListPageHead from '@/components/ListPageHead.vue'
import { useListsStore } from '@/stores/lists'
import { storeToRefs } from 'pinia'
import ProjectHead from '@/components/Project/ProjectHead.vue'
import ProjectGoal from '@/components/Project/ProjectGoal.vue'

const listsStore = useListsStore()
const { openedList } = storeToRefs(listsStore)
</script>

<template>
  <Page>
    <ProjectHead />
    <ProjectGoal />
    <TaskList />
  </Page>
</template>
