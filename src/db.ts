import localforage from 'localforage'
import { v4 as uuidv4 } from 'uuid'
import type { List } from './domain'

const dbName = 'goofy'

export const listsDB = localforage.createInstance({
  name: dbName,
  storeName: 'lists'
})

export const tasksDB = localforage.createInstance({
  name: dbName,
  storeName: 'tasks'
})

const dbInitKey = 'db-init'

if (localStorage.getItem(dbInitKey) != 'true') {
  ;['Today', 'This week', 'Later'].forEach((title, order) => {
    const id = uuidv4()
    listsDB.setItem<List>(id, {
      type: 'titled',
      id,
      title,
      tasks: [],
      order
    })
  })

  localStorage.setItem(dbInitKey, 'true')
}
