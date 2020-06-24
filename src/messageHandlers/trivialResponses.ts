import { sendMessage } from '../sendMessage'
import { GlobalConfig } from '../types/env'
import { responseStatus } from 'src/types/state'
import { NewMessageObject } from 'src/types/api'

const infoMessage = (
  'Привет! Вот информация о том, что я могу:\n\n'
  + '"Фото": Отправится фотография Максимки с камеры\n'
  + '"Инфо": Показать, что я могу\n'
)

export const responseInfo = (config: GlobalConfig) => async (
  { message }: NewMessageObject,
): Promise<responseStatus> => {
  try {
    sendMessage(config, {
      message: infoMessage,
      userId: message.from_id,
    })
  } catch (e) {
    console.error(e)
    return 1
  }
  return 0
}

export const responseUnknownCommand = (config: GlobalConfig) => async (
  { message }: NewMessageObject,
): Promise<responseStatus> => {
  try {
    sendMessage(config, {
      message: 'Извини, я такую команду не знаю :(',
      userId: message.from_id,
    })
  } catch (e) {
    console.error(e)
    return 1
  }
  return 0
}
