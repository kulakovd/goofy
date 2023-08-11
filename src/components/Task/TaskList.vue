<script setup lang="ts">
import TaskView from './TaskView.vue';
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import TaskEditor from './TaskEditor.vue';

const tasksStore = useTasksStore();
const { tasks, newTaskCreating, editingTasksIds } = storeToRefs(tasksStore);
</script>

<template>
  <div class="list">
    <TaskEditor 
      v-if="newTaskCreating" 
      mode="create"
      title=""
      description=""
      @cancel="tasksStore.cancelAddTask"
      @save="tasksStore.saveNewTask"
    />
    <template v-for="task in tasks" :key="task.id">
      <TaskEditor 
        v-if="editingTasksIds.has(task.id)" 
        mode="edit"
        :title="task.title"
        :description="task.description ?? ''"
        @cancel="tasksStore.cancelEditTask(task.id)"
        @save="(upd) => tasksStore.saveTask(task.id, upd)"
      />
      <TaskView v-else :task="task" />
    </template>
  </div>
</template>

<style scoped>
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
