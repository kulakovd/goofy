import { listsDB } from '@/db'
import type { List, TitledList, Project } from '@/domain'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useListsStore = defineStore('lists', () => {
  const openedList = reactive<{
    id?: string
    title?: string
    goal?: Project['goal']
    color?: Project['color']
  }>({})

  const titledLists = reactive([] as Array<TitledList>)
  const projects = reactive([] as Array<Project>)

  const firstListId = computed(() => titledLists[0]?.id)

  const openedListId = computed(() => openedList.id)

  async function loadLists() {
    titledLists.splice(0, titledLists.length)
    projects.splice(0, projects.length)

    const loadedTitledLists: Array<TitledList> = []
    const loadedProjects: Array<Project> = []

    await listsDB.iterate<List, void>((list) => {
      if (list.type === 'titled') {
        loadedTitledLists.push(list)
      } else {
        loadedProjects.push(list)
      }
    })

    titledLists.push(...loadedTitledLists.sort((a, b) => a.order - b.order))
    projects.push(...loadedProjects.sort((a, b) => a.order - b.order))
  }

  function openList(id: string) {
    const titledList = titledLists.find((list) => list.id === id)
    const project = projects.find((list) => list.id === id)

    if (titledList) {
      openedList.id = titledList.id
      openedList.title = titledList.title
    } else if (project) {
      openedList.id = project.id
      openedList.title = project.title
      openedList.goal = project.goal
      openedList.color = project.color
    } else {
      openedList.id = undefined
      openedList.title = undefined
      openedList.goal = undefined
      openedList.color = undefined
    }
  }

  function createProject() {
    const id = uuidv4()
    const project: Project = {
      id,
      type: 'project',
      title: 'New Project',
      goal: '',
      color: 'blue',
      completed: false,
      order: projects.length,
      tasks: []
    }

    projects.push(project)
    listsDB.setItem(id, project)

    return project
  }

  async function updateProject(
    id: string,
    updates: {
      title?: string
      goal?: string
      color?: Project['color']
    }
  ) {
    const project = await listsDB.getItem<Project>(id)
    const index = projects.findIndex((list) => list.id === id)
    if (project == null || index === -1) return

    const newProject: Project = {
      ...project,
      ...updates,
    }

    projects.splice(index, 1, newProject)

    listsDB.setItem(project.id, newProject)
  }

  function deleteProject(id: string) {
    const project = projects.find((list) => list.id === id)
    if (project == null) return

    projects.splice(projects.indexOf(project), 1)
    listsDB.removeItem(project.id)

    openedList.id = undefined
    openedList.title = undefined
    openedList.goal = undefined
    openedList.color = undefined
  }

  return {
    openedList,
    openedListId,
    firstListId,
    titledLists,
    projects,
    createProject,
    loadLists,
    openList,
    updateProject,
    deleteProject
  }
})
