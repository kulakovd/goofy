import { listsDB } from '@/db'
import type { List, TitledList, Project } from '@/domain'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const titledLists = reactive([] as Array<TitledList>)
  const projects = reactive([] as Array<Project>)

  async function loadMenu() {
    listsDB.iterate<List, void>((list) => {
      if (list.type === 'titled') {
        titledLists.push(list)
      } else {
        projects.push(list)
      }
    })
  }

  return {
    titledLists,
    projects,
    loadMenu
  }
})
