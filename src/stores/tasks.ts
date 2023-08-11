import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { Task } from '@/domain';
import { v4 as uuidv4 } from 'uuid';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = reactive([] as Array<Task>);
  const editingTasksIds = reactive(new Set<Task['id']>());
  const newTaskCreating = ref(false);

  tasks.push(...[
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
  ]);

  function saveTask(
    id: Task['id'],
    updates: {
      title: string;
      description: string | null;
    }
  ) {
    const index = tasks.findIndex((t) => t.id === id);
    const updated = { 
      ...tasks[index], 
      title: updates.title, 
      description: updates.description?.trim() === '' ? null : updates.description
    };
    tasks.splice(index, 1, updated);

    editingTasksIds.delete(id);
  }

  function saveNewTask(
    updates: {
      title: string;
      description: string | null;
    }
  ) {
    console.log(updates);
    if (updates.title == null || updates.title.trim() === '') {
      return;
    }

    tasks.unshift({
      id: uuidv4(),
      title: updates.title,
      description: updates.description,
      completed: false,
    });

    newTaskCreating.value = false;
  }

  function editTask(id: Task['id']) {
    editingTasksIds.add(id);
  }

  function cancelEditTask(id: Task['id']) {
    editingTasksIds.delete(id);
  }

  function addTask() {
    newTaskCreating.value = true;
  }

  function cancelAddTask() {
    newTaskCreating.value = false;
  }

  function toggleComplete(id: Task['id']) {
    const index = tasks.findIndex((t) => t.id === id);
    const updated = { ...tasks[index], completed: !tasks[index].completed };
    tasks.splice(index, 1, updated);
  }

  return { 
    tasks,
    editingTasksIds,
    newTaskCreating,
    saveTask,
    saveNewTask,
    editTask,
    cancelEditTask,
    addTask,
    cancelAddTask,
    toggleComplete,
   };
});