<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Task } from '@/domain';
import { useTasksStore } from '@/stores/tasks';
import Button from '@/components/Button.vue';

defineProps<{
  task: Task;
}>()

const tasksStore = useTasksStore();
const { editTask, toggleComplete } = tasksStore;
</script>

<template>
  <div class="task" @click="toggleComplete(task.id)">
    <div class="flex">
      <div class="head">
        <label class="label">
          <input 
            class="hidden-checkbox" 
            type="checkbox" 
            hidden 
            v-model="task.completed" 
          />
          <span class="checkbox" />
        </label>
        <span 
          class="title" 
          :class="{ 'line-through': task.completed }"
        >
          {{ task.title }}
        </span>
      </div>
      <span class="description" v-if="task.description !== null">{{ task.description }}</span>
    </div>
    <Button
      class="edit-button"
      @click.stop="editTask(task.id)"
    >
      Edit
    </Button>
  </div>
</template>

<style scoped>
  .task {
    display: flex;
    gap: 8px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    align-items: flex-start;
    justify-content: space-between;
  }

  .edit-button {
    opacity: 0;
  }

  .task:hover .edit-button {
    opacity: 1;
  }

  .head {
    display: flex;
    gap: 8px;
    align-items: center;
    flex: 1;
  }

  .task:hover {
    background-color: var(--menu-hover-bg);
  }

  .label {
    padding-block: 4px;
  }

  .checkbox {
    position: relative;
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid var(--color-text);
    border-radius: 100%;
    cursor: pointer;
  }

  .checkbox::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '✓';
    display: block;
    font-size: 0.7em;
    font-weight: bold;
    opacity: 0;
    transition: opacity 100ms ease-in-out;
  }

  .hidden-checkbox:checked + .checkbox {
    background: var(--button-hover-color);
    border-color: var(--button-hover-color);
  }

  .hidden-checkbox:checked + .checkbox::after {
    color: white;
    opacity: 1;
  }
  
  .task:hover .hidden-checkbox:not(:checked) + .checkbox::after {
    color: var(--color-text);
    opacity: 1;
  }

  .flex {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-weight: bold;
  }

  .description {
    padding-inline-start: 24px;
  }

  .line-through {
    text-decoration: line-through;
  }
</style>
