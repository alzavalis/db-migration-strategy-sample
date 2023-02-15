import { MonitorResource } from '../types'

class Monitor implements MonitorResource {
  public sendError = (message: string) => {
    console.error('ERROR:', message)
  }
}

export default Monitor
