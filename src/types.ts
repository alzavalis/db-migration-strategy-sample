export type Item = {
  id: string
}

export type MigratedItem = {
  id: string
  company: string
}

export interface ItemService {
  save: (item: Item) => Promise<void>
  getById: (id: string) => Promise<Item>
  saveWithRollback: (item: Item) => Promise<void>
  rollbackDb1: (item: Item, oldValues: Item) => Promise<void>
}

export interface DatabaseResource {
  putItem: (item: Item) => Promise<Item | null>
  getItem: (id: string) => Promise<Item | MigratedItem>
  deleteItem: (id: string) => Promise<void>
}

export interface MonitorResource {
  sendError: (message: string) => void
}

export interface AppResources {
  db1: DatabaseResource
  db2: DatabaseResource
  monitor: MonitorResource
}
