import { GlobalConfig } from '../types/env'
import { responseStatus } from '../types/state'
import { sendMessage } from '../sendMessage'
import responsePhoto from './responseGetPhoto'
import { NewMessageObject } from '../types/api'
import { KeyboardTypes } from '../getKeyboard'

const baseSender = async (
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
      userId: config.env.RECIVER_ID,
    })

    messageObject.message.from_id = config.env.RECIVER_ID
    if (withPhoto) await responsePhoto(config)(messageObject)

    await sendMessage(config, {
      message: 'Отправил!',
      userId: config.env.HOST_ID,
      keyboardType: keyboardType || 'hostInteraction',
    })
  } catch (e) {
    console.log(e)
    return 1
  }
  return 0
}

export const hostDinnerResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseSender(
      config,
      {
        message: 'Ушел на обед, вернусь через ' + new Date(Date.now() + 1800000).toLocaleTimeString()
        + '. Подкрепляю фото',
        messageObject,
        withPhoto: true,
      },
    )
  )
)
export const hostLittleLeaveResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseSender(
      config,
      {
        message: 'Отошёл ненадолго',
        messageObject,
        keyboardType: 'default',
      },
    )
  )
)
export const hostReturnResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseSender(
      config,
      {
        message: 'Вернулся!',
        messageObject,
        keyboardType: 'default',
      },
    )
  )
)
export const hostGoHomeResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseSender(
      config,
      {
        message: 'Ушел домой!',
        messageObject,
        withPhoto: true,
      },
    )
  )
)
export const hostSendPhotoResponse = (config: GlobalConfig) => (
  async (messageObject: NewMessageObject): Promise<responseStatus> => (
    baseSender(
      config,
      {
        message: 'Фото от отправителя!',
        messageObject,
        withPhoto: true,
      },
    )
  )
)
