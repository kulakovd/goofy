<script setup lang="ts">
import type { Task } from '@/domain';
import TaskView from './TaskView.vue';

const tasks: Array<Task> = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
  },
  {
    id: '2',
    title: 'Task 2',
    description: null,
    completed: false,
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    completed: true,
  },
  {
    id: '4',
    title: 'Task 4',
    description: null,
    completed: true,
  },
  {
    id: '5',
    title: 'Task 5',
    description: 'Description 5',
    completed: false,
  },
  {
    id: '6',
    title: 'Task 6',
    description: null,
    completed: false,
  },
  {
    id: '7',
    title: 'Task 7',
    description: 'Description 7',
    completed: true,
  },
  {
    id: '8',
    title: 'Task 8',
    description: null,
    completed: true,
  },
  {
    id: '9',
    title: 'Task 9',
    description: 'Description 9',
    completed: false,
  },
  {
    id: '10',
    title: 'Task 10',
    description: null,
    completed: false,
  },
  {
    id: '11',
    title: 'Task 11',
    description: 'Description 11',
    completed: true,
  },
  {
    id: '12',
    title: 'Task 12',
    description: null,
    completed: true,
  },
  {
    id: '13',
    title: 'Task 13',
    description: 'Description 13',
    completed: false,
  },
  {
    id: '14',
    title: 'Task 14',
    description: null,
    completed: false,
  },
  {
    id: '15',
    title: 'Task 15',
    description: 'Description 15',
    completed: true,
  },
  {
    id: '16',
    title: 'Task 16',
    description: null,
    completed: true,
  },
  {
    id: '17',
    title: 'Task 17',
    description: 'Description 17',
    completed: false,
  },
  {
    id: '18',
    title: 'Task 18',
    description: null,
    completed: false,
  },
  {
    id: '19',
    title: 'Task 19',
    description: 'Description 19',
    completed: true,
  },
  {
    id: '20',
    title: 'Task 20',
    description: null,
    completed: true,
  },
  {
    id: '21',
    title: 'Task 21',
    description: 'Description 21',
    completed: false,
  },
];
</script>

<template>
  <div class="list">
    <TaskView v-for="task in tasks" :key="task.id" :task="task" />
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
