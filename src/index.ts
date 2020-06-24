import bot from './bot'
import getGlobalConfig from './utils/getGlobalConfig'

const config = getGlobalConfig()

bot(config)
