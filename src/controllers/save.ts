import { Request, Response } from 'express'
import Service from '../services/ItemService'
import { AppResources } from '../types'

const saveItem =
  (resources: AppResources) => async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const service = new Service(resources)

      await service.saveWithRollback(id)

      return res.status(200)
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }

export default saveItem
