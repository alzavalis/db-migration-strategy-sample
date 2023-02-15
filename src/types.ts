export type Item = {
  id: string
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
