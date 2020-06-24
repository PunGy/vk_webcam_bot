import { GlobalConfig } from '../types/env'
import { responseStatus } from '../types/state'
import { sendMessage } from '../sendMessage'
import responsePhoto from './responseGetPhoto'
import { NewMessageObject } from '../types/api'
import { KeyboardTypes } from '../getKeyboard'

const baseElenaSender = async (
  config: GlobalConfig,
  messageConfig: {
    message: string;
    messageObject?: NewMessageObject;
    withPhoto?: boolean;
    keyboardType?: KeyboardTypes;
  },
): Promise<responseStatus> => {
  try {
    const {
      message,
      messageObject,
      withPhoto,
      keyboardType,
    } = messageConfig

    await sendMessage(config, {
      message,
      userId: config.env.ELENA_ID,
    })

    messageObject.message.from_id = config.env.ELENA_ID
    if (withPhoto) await responsePhoto(config)(messageObject)

    await sendMessage(config, {
      message: 'Отправил!',
      userId: config.env.MAXIM_ID,
      keyboardType: keyboardType || 'maximInteraction',
    })
  } catch (e) {
    console.log(e)
    return 1
  }
  return 0
}

export const maxDinnerResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseElenaSender(
      config,
      {
        message: 'Максимка вышел кушать, придёт примерное в ' + new Date(Date.now() + 1800000).toLocaleTimeString()
        + '. Вот тебе его фоточка, дабы ожидание не было столь томным!',
        messageObject,
        withPhoto: true,
      },
    )
  )
)
export const maxLittleLeaveResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseElenaSender(
      config,
      {
        message: 'Максимка отошел ненадолго, скоро вернётся)',
        messageObject,
        keyboardType: 'default',
      },
    )
  )
)
export const maxReturnResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseElenaSender(
      config,
      {
        message: 'О, Максимка вернулся!',
        messageObject,
        keyboardType: 'default',
      },
    )
  )
)
export const maxGoHomeResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseElenaSender(
      config,
      {
        message: 'Максимка собрался домой! Скорее всего я больше не смогу тебе отвечать( '
        + 'Вот тебе его личико, оно скоро будет на пороге дома!',
        messageObject,
        withPhoto: true,
      },
    )
  )
)
export const maxSendPhotoResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseElenaSender(
      config,
      {
        message: 'Максимка хочет чтобы ты это увидела! Только посмотри на это!!!',
        messageObject,
        withPhoto: true,
      },
    )
  )
)
