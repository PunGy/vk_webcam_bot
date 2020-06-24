import { GlobalConfig, UserState } from '../types/env'
import { NewMessageObject } from '../types/api'

export const getSenderState = (config: GlobalConfig, sender: NewMessageObject | number): UserState => {
  const fromId = typeof sender === 'number'
    ? sender
    : sender.message.from_id
  if (fromId === config.env.MAXIM_ID) return config.maximState
  return config.elenaState
}
