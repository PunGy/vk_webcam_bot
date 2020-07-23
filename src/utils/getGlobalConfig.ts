import dotenv from 'dotenv'
import { EnvConfig, GlobalConfig } from '../types/env'

let _config: GlobalConfig | null = null

const getGlobalConfig = (): GlobalConfig => {
  if (_config != null) {
    return _config as GlobalConfig
  }
  const env: EnvConfig = dotenv.config().parsed as unknown as EnvConfig
  env.GROUP_ID = +env.GROUP_ID
  env.RECIVER_ID = +env.RECIVER_ID
  env.HOST_ID = +env.HOST_ID

  let mode: 'production'|'development' = env.MODE
  if (process.argv[1] === '-d') {
    mode = 'development'
  }

  const config: GlobalConfig = {
    env,
    mode,
    hostState: {
      keyboard: 'hostDefault',
    },
    reciverState: {
      keyboard: 'default',
    },
  }

  _config = config
  return config
}

export default getGlobalConfig
