import { AppResources } from '../types'
import Database from './Database'
import Monitor from './Monitor'

class Resources implements AppResources {
  public db1 = new Database()
  public db2 = new Database()
  public monitor = new Monitor()
}

export default Resources
