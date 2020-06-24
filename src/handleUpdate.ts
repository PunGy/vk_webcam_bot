import { UpdateObject } from './types/api'
import * as R from 'ramda'
import handleNewMessage from './messageHandlers'
import { GlobalConfig } from './types/env'
import { responseStatus } from './types/state'

const isType = R.propEq('type')

const handleUpdate = (
  config: GlobalConfig,
): (x: UpdateObject<object>) => Promise<responseStatus> => (
  R.cond<UpdateObject<object>, Promise<responseStatus | null>>([
    [isType('message_new'), handleNewMessage(config)],
    [R.T, (): Promise<responseStatus> => Promise.resolve(0)],
  ])
)

export default handleUpdate
