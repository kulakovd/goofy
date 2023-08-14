<script setup lang="ts">
import TaskView from './TaskView.vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import TaskEditor from './TaskEditor.vue'
import { onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { throttle } from '@/utils/throttle'
import { useRoute } from 'vue-router'

const tasksStore = useTasksStore()
const { tasks, newTaskCreating, editingTasksIds, draggingTaskId } = storeToRefs(tasksStore)
const { reorderTasks, loadTasks } = tasksStore
const dragList = ref<HTMLElement | null>(null)
const dragListLeft = ref<number>(0)
const dragListTop = ref<number>(0)

function updateListLeftTop() {
  const rect = dragList.value?.getBoundingClientRect()
  dragListLeft.value = rect?.left ?? 0
  dragListTop.value = rect?.top ?? 0
}

function preventDragOver(ev: DragEvent) {
  ev.preventDefault()
}

const route = useRoute()

onBeforeMount(() => {
  loadTasks(route.params.id as string)

  watch(route, () => {
    loadTasks(route.params.id as string)
  })
})

onMounted(() => {
  updateListLeftTop()

  document.addEventListener('dragover', preventDragOver)
  window.addEventListener('resize', updateListLeftTop)
})

onUnmounted(() => {
  document.addEventListener('dragover', preventDragOver)
  window.removeEventListener('resize', updateListLeftTop)
})

const onDragOver = throttle((ev: DragEvent) => {
  if (!dragList.value) return

  const tasksClone = [...tasks.value]

  const x = dragListLeft.value
  const y = Math.max(ev.clientY, dragListTop.value)

  const listItem = document
    .elementsFromPoint(x, y)
    .find((el) => el.classList.contains('list-item')) as HTMLElement | null

  const listItemId = listItem?.dataset.itemId

  const itemIndex = tasksClone.findIndex((task) => task.id === listItemId)
  const draggingTaskIndex = tasksClone.findIndex((task) => task.id === draggingTaskId.value)

  if (itemIndex !== -1 && draggingTaskIndex != -1 && itemIndex !== draggingTaskIndex) {
    reorderTasks(itemIndex, draggingTaskIndex)
  }
}, 16)
</script>

<template>
  <Teleport to="#app-teleport">
    <div class="drop-area" @dragover="onDragOver($event)" />
  </Teleport>

  <div class="list">
    <TaskEditor
      v-if="newTaskCreating"
      mode="create"
      title=""
      description=""
      @cancel="tasksStore.cancelAddTask"
      @save="tasksStore.saveNewTask"
    />
    <div class="list" ref="dragList" @dragover="onDragOver($event)">
      <div class="list-item-wrapper" v-for="task in tasks" :key="task.id">
        <TaskEditor
          v-if="editingTasksIds.has(task.id)"
          class="list-item"
          mode="edit"
          :title="task.title"
          :description="task.description ?? ''"
          @cancel="tasksStore.cancelEditTask(task.id)"
          @save="(upd) => tasksStore.saveTask(task.id, upd)"
        />
        <TaskView
          v-else
          :data-item-id="task.id"
          class="list-item"
          :task="task"
          @dragstart="draggingTaskId = task.id"
          @dragend="draggingTaskId = null"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.x {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background-color: red;
}

.y {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: red;
}

.drop-area {
  position: absolute;
  inset: 0;
}

.list-item-wrapper {
  padding-block: 4px;
}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
