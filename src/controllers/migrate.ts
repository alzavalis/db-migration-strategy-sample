import { Request, Response } from 'express'
import Service from '../services/ItemService'
import { AppResources } from '../types'

const migrateItems =
  (resources: AppResources) => async (req: Request, res: Response) => {
    const { ids } = req.body
    const service = new Service(resources)

    let errors: string[] = []
    for (let id of ids) {
      try {
        await service.migrate(id)
      } catch (e) {
        errors = [...errors, id]
      }
    }

    return res.status(200).json({ idsWithError: errors })
  }

export default migrateItems
