import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { List, Task } from '@/domain'
import { v4 as uuidv4 } from 'uuid'
import { listsDB, tasksDB } from '@/db'

export const useTasksStore = defineStore('tasks', () => {
  const openedListId = ref<string | null>(null)
  const tasks = reactive([] as Array<Task>)
  const editingTasksIds = reactive(new Set<Task['id']>())
  const newTaskCreating = ref(false)
  const draggingTaskId = ref<Task['id'] | null>(null)

  async function saveList() {
    if (openedListId.value == null) {
      return
    }

    const list = await listsDB.getItem<List>(openedListId.value)
    if (list == null) {
      return
    }

    listsDB.setItem<List>(openedListId.value, {
      ...list,
      tasks: tasks.map((t) => t.id)
    })
  }

  async function loadTasks(listId: string) {
    tasks.splice(0, tasks.length)
    editingTasksIds.clear()

    const list = await listsDB.getItem<List>(listId)
    if (list == null) {
      return
    }

    const listTasks = await Promise.all(list.tasks.map((taskId) => tasksDB.getItem<Task>(taskId)))

    openedListId.value = listId

    listTasks.forEach((task) => {
      if (task != null) {
        tasks.push(task)
      }
    })
  }

  function saveTask(
    id: Task['id'],
    updates: {
      title: string
      description: string | null
    }
  ) {
    const index = tasks.findIndex((t) => t.id === id)
    const updated = {
      ...tasks[index],
      title: updates.title,
      description: updates.description?.trim() === '' ? null : updates.description
    }
    tasks.splice(index, 1, updated)

    editingTasksIds.delete(id)

    tasksDB.setItem(id, updated)
  }

  function saveNewTask(updates: { title: string; description: string | null }) {
    if (updates.title == null || updates.title.trim() === '') {
      return
    }

    const task = {
      id: uuidv4(),
      title: updates.title,
      description: updates.description,
      completed: false
    }

    tasks.unshift(task)

    newTaskCreating.value = false

    tasksDB.setItem(task.id, task)
    saveList()
  }

  function deleteTask(id: Task['id']) {
    const index = tasks.findIndex((t) => t.id === id)
    tasks.splice(index, 1)
    
    editingTasksIds.delete(id)

    tasksDB.removeItem(id)
    saveList()
  }

  function editTask(id: Task['id']) {
    editingTasksIds.add(id)
  }

  function cancelEditTask(id: Task['id']) {
    editingTasksIds.delete(id)
  }

  function addTask() {
    newTaskCreating.value = true
  }

  function cancelAddTask() {
    newTaskCreating.value = false
  }

  function toggleComplete(id: Task['id']) {
    const index = tasks.findIndex((t) => t.id === id)
    const updated = { ...tasks[index], completed: !tasks[index].completed }
    tasks.splice(index, 1, updated)

    tasksDB.setItem(id, updated)
  }

  function reorderTasks(from: number, to: number) {
    const [removed] = tasks.splice(from, 1)
    tasks.splice(to, 0, removed)

    saveList()
  }

  async function putDraggingTaskToList(
    toListId: List['id'],
  ) {
    const taskId = draggingTaskId.value
    const fromListId = openedListId.value
    if (fromListId == null || taskId == null) {
      return
    }

    const fromList = await listsDB.getItem<List>(fromListId)
    const toList = await listsDB.getItem<List>(toListId)
    if (fromList == null || toList == null || fromListId === toListId) {
      return
    }

    const fromListTasks = fromList.tasks.filter((t) => t !== taskId)
    const toListTasks = [taskId, ...toList.tasks]

    await listsDB.setItem<List>(fromListId, {
      ...fromList,
      tasks: fromListTasks
    })

    await listsDB.setItem<List>(toListId, {
      ...toList,
      tasks: toListTasks
    })

    const tasksIndex = tasks.findIndex((t) => t.id === taskId)
    tasks.splice(tasksIndex, 1)
  }

  return {
    loadTasks,
    tasks,
    editingTasksIds,
    newTaskCreating,
    saveTask,
    saveNewTask,
    deleteTask,
    editTask,
    cancelEditTask,
    addTask,
    cancelAddTask,
    toggleComplete,
    reorderTasks,
    draggingTaskId,
    putDraggingTaskToList
  }
})
