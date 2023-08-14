import { listsDB } from '@/db'
import type { List, Project } from '@/domain'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const openedProject = ref<Project | null>(null)

  async function loadProject(projectId: string) {
    const list = await listsDB.getItem<List>(projectId)
    if (list != null && list.type === 'project') {
      openedProject.value = list
    }
  }

  async function saveProject() {
    const project = openedProject.value
    if (project == null) return

    await listsDB.setItem(project.id, project)
  }

  function updateProject(updates: {
    title?: string
    goal?: string
    color?: Project['color']
  }) {
    const project = openedProject.value
    if (project == null) return

    const newProject = Object.assign(project, updates)
    openedProject.value = newProject

    saveProject()
  }

  return {
    openedProject,
    loadProject,
    updateProject
  }
})
