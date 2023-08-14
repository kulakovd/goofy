<script setup lang="ts">
import Page from '@/components/Page.vue'
import TaskList from '@/components/Task/TaskList.vue'
import ListPageHead from '@/components/ListPageHead.vue'
import { useListsStore } from '@/stores/lists'
import { storeToRefs } from 'pinia'
import PageTitle from '@/components/PageTitle.vue'

const listsStore = useListsStore()
const { openedList } = storeToRefs(listsStore)
</script>

<template>
  <Page>
    <ListPageHead>
      <PageTitle>
        {{ openedList.title }}
      </PageTitle>
    </ListPageHead>
    <TaskList />
  </Page>
</template>
