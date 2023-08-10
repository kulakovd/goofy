import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Project } from '@/domain'

type ProjectInList = Pick<Project, 'id' | 'title'>

export const useProjectsStore = defineStore('counter', () => {
  const projects = reactive([] as Array<ProjectInList>)
  
  function addProject(project: ProjectInList) {
    projects.push({
      id: "",
      title: project.title,
    })
  }

  return { projects, addProject }
})
