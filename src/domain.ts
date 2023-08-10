export type Task = {
  id: string
  title: string
  description: string | null
  completed: boolean
}

export type List = {
  id: string
  title: string
  tasks: Array<Task['id']>
}

export type Project = {
  id: string
  title: string
  goal: string
  completed: boolean
  tasks: Array<Task['id']>
}
