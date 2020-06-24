import { NewMessageConfig } from './types/api'
import { GlobalConfig } from './types/env'
import callApi from './callApi'
import getKeyboard from './getKeyboard'
import { getSenderState } from './utils/stateUtils'

const getRandomId = (): number => (
  Math.floor(Math.random() * ((2 ** 64) - 0) + 0)
)

export const sendMessage = (globalConfig: GlobalConfig, config: NewMessageConfig): Promise<string> => {
  const query = (
    (config.message ? `message=${encodeURI(config.message)}` : '')
    + (config.attachment ? `attachment=${config.attachment}` : '')
    + `&user_id=${config.userId}`
    + `&keyboard=${JSON.stringify(getKeyboard(globalConfig.env, { userId: config.userId, type: config.keyboardType }))}`
    + `&random_id=${getRandomId()}`
  )

  const senderState = getSenderState(globalConfig, config.userId)
  senderState.keyboard = config.keyboardType

  return callApi(globalConfig.env, {
    apiMethod: `/method/messages.send`,
    httpMethod: 'POST',
    data: query,
  })
}
