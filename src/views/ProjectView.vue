<script setup lang="ts">
import Page from '@/components/Page.vue'
import TaskList from '@/components/Task/TaskList.vue'
import ListPageHead from '@/components/ListPageHead.vue'
import { useListsStore } from '@/stores/lists'
import { storeToRefs } from 'pinia'
import PageTitle from '@/components/PageTitle.vue'
import ProjectColor from '@/components/ProjectColor.vue'

const listsStore = useListsStore()
const { openedList } = storeToRefs(listsStore)
</script>

<template>
  <Page>
    <ListPageHead>
      <PageTitle>
        <ProjectColor
          v-if="openedList.color != null"
          :color="openedList.color"
          size="large"
        />
        {{ openedList.title }}
      </PageTitle>
    </ListPageHead>
    <div>
      <span class="goal-title">Project goal:</span>
      <span class="goal-text">{{ openedList.goal }}</span>
    </div>
    <TaskList />
  </Page>
</template>

<style scoped>
.goal-title {
  font-weight: bold;
}
</style>
