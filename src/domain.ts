import type { projectsPalette } from './assets/projects-palette'

export type Task = {
  id: string
  title: string
  description: string | null
  completed: boolean
}

export type TitledList = {
  type: 'titled'
  id: string
  title: string
  tasks: Array<Task['id']>
  order: number
}

export type Project = {
  type: 'project'
  id: string
  title: string
  goal: string
  completed: boolean
  color: keyof typeof projectsPalette
  tasks: Array<Task['id']>
  order: number
}

export type List = TitledList | Project
