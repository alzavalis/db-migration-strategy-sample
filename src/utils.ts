import config from './config'

export const isDb2Enabled = () => {
  return config.feature_flags.db2_is_enabled
}
