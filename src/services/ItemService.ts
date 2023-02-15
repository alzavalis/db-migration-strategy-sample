import { isDb2Enabled } from '../utils'
import {
  AppResources,
  Item,
  MigratedItem,
  ItemService as Service,
} from '../types'

class ItemService implements Service {
  constructor(private resources: AppResources) {}

  public migrate = async (id: string) => {
    const item: Item = await this.getById(id)
    const itemReadyToBeMigrated = this.formatWithNewStructure(item)
    await this.resources.db2.putItem(itemReadyToBeMigrated)
  }

  public getById = async (id: string) => {
    // db1 is used as the principal resource.
    return await this.resources.db1.getItem(id)
  }

  private formatWithNewStructure = (item: Item): MigratedItem => {
    return { ...item, company: 'my-company-name' }
  }

  public save = async (item: Item) => {
    await this.resources.db1.putItem(item)

    // Using a feature flag to enable the usage of the
    // db2, to easily change this value.
    if (isDb2Enabled()) {
      try {
        await this.migrate(item.id)
      } catch (e) {
        // Tracking any failure, but continue the operation.
        // Don't want to stop the raise an error, just know
        // that my data in db2 is not synced with db1 anymore.
        this.resources.monitor.sendError('Unable to save item in db2')
      }
    }
  }

  public rollbackDb1 = async (item: Item, oldAttributes: Item | null) => {
    if (oldAttributes) {
      await this.resources.db1.putItem(oldAttributes)
    } else {
      await this.resources.db1.deleteItem(item.id)
    }
  }

  public saveWithRollback = async (item: Item) => {
    const oldAttributes = await this.resources.db1.putItem(item)

    if (isDb2Enabled()) {
      try {
        await this.migrate(item.id)
      } catch (e) {
        this.resources.monitor.sendError('Unable to save item in db2')
        this.rollbackDb1(item, oldAttributes)
      }
    }
  }
}

export default ItemService
