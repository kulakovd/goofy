import { listsDB } from '@/db'
import type { List, TitledList, Project } from '@/domain'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useListsStore = defineStore('menu', () => {
  const openedList = reactive<{
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
      openedList.title = titledList.title
    } else if (project) {
      openedList.title = project.title
      openedList.goal = project.goal
      openedList.color = project.color
    }
  }

  return {
    openedList,
    titledLists,
    projects,
    loadLists,
    openList
  }
})
