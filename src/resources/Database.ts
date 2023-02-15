import { DatabaseResource, Item } from '../types'

class Database implements DatabaseResource {
  public putItem = async (item: Item): Promise<Item> => {
    const oldValue = item
    console.info('Item saved', item.id)

    return Promise.resolve(oldValue)
  }

  public getItem = async (id: string): Promise<Item> => {
    console.info('Item: ', id)
    const item: Item = { id }

    return Promise.resolve(item)
  }

  public deleteItem = async (id: string): Promise<void> => {
    console.info('Delete item: ', id)
    Promise.resolve(true)
  }
}

export default Database
