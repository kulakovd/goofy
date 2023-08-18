<script setup lang="ts">
import AddTaskButton from '@/components/AddTaskButton.vue'
import { useListsStore } from '@/stores/lists'
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

const listsStore = useListsStore()
const { openedList } = storeToRefs(listsStore)
const route = useRoute()

onMounted(() => {
  listsStore.openList(route.params.id as string)
  watch(route, () => {
    listsStore.openList(route.params.id as string)
  })
})
</script>

<template>
  <div class="head">
    <slot />
    <AddTaskButton />
  </div>
</template>

<style scoped>
.head {
  z-index: 1;
  position: sticky;
  top: 0;
  background: var(--color-background);
  width: 100%;
}
</style>
