import { sendMessage } from '../sendMessage'
import getGlobalConfig from '../utils/getGlobalConfig'

const config = getGlobalConfig()

sendMessage(config, {
  message: 'Я выключился, и больше на сообщения не смогу отвечать :(',
  userId: config.env.RECIVER_ID,
})
