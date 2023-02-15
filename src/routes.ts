import { Application, Request, Response } from 'express'
import { save, migrate } from './controllers'
import { AppResources } from './types'

export default ({
  app,
  resources,
}: {
  app: Application
  resources: AppResources
}) => {
  app.get('/ping', (_req: Request, res: Response) => res.send('pong'))
  app.post('/save', save(resources))
  app.post('/internal/migrate', migrate(resources))
}
