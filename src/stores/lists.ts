import { listsDB } from '@/db'
import type { List, TitledList, Project } from '@/domain'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
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

  function updateProject(
    id: string,
    updates: {
      title?: string
      goal?: string
      color?: Project['color']
    }
  ) {
    const project = projects.find((list) => list.id === id)
    if (project == null) return

    const newProject = {
      ...project,
      ...updates,
      tasks: project.tasks.slice()
    }
    projects.splice(projects.indexOf(project), 1, newProject)

    listsDB.setItem(project.id, newProject)
  }

  return {
    openedList,
    titledLists,
    projects,
    createProject,
    loadLists,
    openList,
    updateProject
  }
})
