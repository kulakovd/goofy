<script setup lang="ts">
import Page from '@/components/Page.vue'
import AddTaskButton from '@/components/AddTaskButton.vue'
import PageTitle from '@/components/PageTitle.vue'
import TaskList from '@/components/Task/TaskList.vue'

const list = {
  id: 'today',
  title: 'Today'
}
</script>

<template>
  <Page>
    <div class="head">
      <PageTitle>{{ list.title }}</PageTitle>
      <AddTaskButton />
    </div>
    <TaskList />
  </Page>
</template>

<style scoped>
.head {
  z-index: 1;
  position: sticky;
  top: 0;
  background: white;
  width: 100%;
}
</style>
