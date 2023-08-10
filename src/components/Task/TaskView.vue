<script setup lang="ts">
import type { Task } from '@/domain';

defineProps<{
  task: Task;
}>()
</script>

<template>
  <div class="task">
    <label class="label">
      <input 
        class="hidden-checkbox" 
        type="checkbox" 
        hidden 
        v-model="task.completed" 
      />
      <span class="checkbox" />
    </label>
    <div class="flex">
      <span 
        class="title" 
        :class="{ 'line-through': task.completed }"
      >
        {{ task.title }}
      </span>
      <span v-if="task.description !== null">{{ task.description }}</span>
    </div>
  </div>
</template>

<style scoped>
  .task {
    display: flex;
    gap: 8px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }

  .task:hover {
    background-color: var(--menu-hover-bg);
  }

  .label {
    padding-block: 4px;
  }

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: 1px solid var(--color-text);
    border-radius: 100%;
    cursor: pointer;
  }

  .checkbox::after {
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

  .line-through {
    text-decoration: line-through;
  }
</style>
