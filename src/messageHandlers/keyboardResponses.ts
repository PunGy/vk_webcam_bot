import { GlobalConfig } from '../types/env'
import { responseStatus } from '../types/state'
import { sendMessage } from '../sendMessage'
import { NewMessageObject } from '../types/api'

export const responseMaximInteractionKeyboard = (config: GlobalConfig) => (
  async (): Promise<responseStatus> => {
    try {
      sendMessage(config, {
        userId: config.env.MAXIM_ID,
        message: 'Пожалуйста',
        keyboardType: 'maximInteraction',
      })
    } catch (e) {
      console.log(e)
      return 1
    }
    return 0
  }
)
export const responseDefaultKeyboard = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => {
    try {
      sendMessage(config, {
        userId: messageObject.message.from_id,
        message: 'Пожалуйста',
        keyboardType: 'default',
      })
    } catch (e) {
      console.log(e)
      return 1
    }
    return 0
  }
)
export const responseVideoRecordKeyboard = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => {
    try {
      sendMessage(config, {
        userId: messageObject.message.from_id,
        message: 'Выберите продолжительность видео в секундах, или введите свой вариант',
        keyboardType: 'videoRecord',
      })
    } catch (e) {
      console.log(e)
      return 1
    }
    return 0
  }
)

