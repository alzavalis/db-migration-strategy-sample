import bodyParser from 'body-parser'
import express, { Application } from 'express'
import config from './config'
import Resources from './resources'
import appRoutes from './routes'

const PORT = config.app.port

const app: Application = express()
const resources = new Resources()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

appRoutes({ app, resources })

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`)
  })
} catch (error: any) {
  console.error(`Error occured: ${error.message}`)
}
