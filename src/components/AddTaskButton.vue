<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks';

const { addTask } = useTasksStore();
</script>

<template>
  <button type="button" @click="addTask">
    + Add task
  </button>
</template>

<style scoped>
  button {
    background: none;
    color: var(--text-color);
    border: none;
    border-radius: 4px;
    padding: 8px;
    font-size: 1em;
    cursor: pointer;
  }

  button:hover {
    color: var(--button-hover-color);
  }

  button:active {
    transform: var(--click-effect);
  }
</style>
