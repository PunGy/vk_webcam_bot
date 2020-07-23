import { NewMessageObject, UpdateObject } from '../types/api'
import * as R from 'ramda'
import responsePhoto from './responseGetPhoto'
import { responseInfo, responseUnknownCommand } from './trivialResponses'
import {
  hostDinnerResponse,
  hostLittleLeaveResponse,
  hostSendPhotoResponse,
  hostReturnResponse,
  hostGoHomeResponse,
} from './hostResponses'
import {
  responseHostInteractionKeyboard,
  responseDefaultKeyboard,
  responseVideoRecordKeyboard,
 } from './keyboardResponses'
import { responseStatus } from '../types/state'
import { GlobalConfig } from '../types/env'
import responseVideo from './responseGetVideo'
import { getSenderState } from '../utils/stateUtils'

const isAllowedUserId = (userId: number): (x: NewMessageObject) => boolean => (
  R.isNil(userId)
  ? (): boolean => true
  : R.compose(
      R.equals(userId),
      R.path(['message', 'from_id']),
    )
)

const testOnText = (
  checker: (x: string) => boolean,
  userId?: number,
): (y: NewMessageObject) => boolean => (
  R.allPass([
    R.compose(
      checker,
      R.path(['message', 'text']),
    ),
    isAllowedUserId(userId),
  ])
)

export default (config: GlobalConfig) => (
  { object }: UpdateObject<NewMessageObject>,
): Promise<responseStatus> => (
  R.cond<NewMessageObject, Promise<responseStatus>>([
    [testOnText(R.equals('Фото')), responsePhoto(config)],
    [testOnText(R.test(/Начать|Инфо/i)), responseInfo(config)],
    [testOnText(R.equals('На главную')), responseDefaultKeyboard(config)],
    [testOnText(R.equals('Записать видео')), responseVideoRecordKeyboard(config)],

    [testOnText((text) => {
      return R.and(R.test(/^\d*$/g, text), getSenderState(config, object).keyboard === 'videoRecord')
    }), responseVideo(config)],

    [testOnText(R.equals('Взаимодействия с Леной'), config.env.HOST_ID), responseHostInteractionKeyboard(config)],
    [testOnText(R.equals('Не на долго'), config.env.HOST_ID), hostLittleLeaveResponse(config)],
    [testOnText(R.equals('Вернулся'), config.env.HOST_ID), hostReturnResponse(config)],
    [testOnText(R.equals('Обед'), config.env.HOST_ID), hostDinnerResponse(config)],
    [testOnText(R.equals('Показать себя'), config.env.HOST_ID), hostSendPhotoResponse(config)],
    [testOnText(R.equals('Ушел домой'), config.env.HOST_ID), hostGoHomeResponse(config)],

    [R.T, responseUnknownCommand(config)],
  ])
)(object)
