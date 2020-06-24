import { EnvConfig } from './types/env'
import * as R from 'ramda'

export type KeyboardTypes = 'default'|'maximDefault'|'maximInteraction'|'videoRecord'
export interface Keyboard {
  one_time: boolean;
  buttons: Array<
    Array<{
      action: {
        type: string;
        payload: string;
        label: string;
      };
      color: string;
    }>
  >;
}

const defaultKeyboard: Keyboard = {
  one_time: false,
  buttons: [
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "1"}',
          label: 'Фото',
        },
        color: 'primary',
      },
      {
        action: {
          type: 'text',
          payload: '{"button": "2"}',
          label: 'Инфо',
        },
        color: 'secondary',
      },
    ],
    [{
      action: {
        type: 'text',
        payload: '{"button": "videoRecord"}',
        label: 'Записать видео',
      },
      color: 'secondary',
    }],
  ],
}

const maximDefaultKeyboard: Keyboard = R.clone(defaultKeyboard)
maximDefaultKeyboard.buttons.push(...[
  [{
    action: {
      type: 'text',
      payload: '{"button": "getLenaButtons"}',
      label: 'Взаимодействия с Леной',
    },
    color: 'secondary',
  }],
  [
    {
      action: {
        type: 'text',
        payload: '{"button": "littleLeave"}',
        label: 'Не на долго',
      },
      color: 'secondary',
    },
    {
      action: {
        type: 'text',
        payload: '{"button": "maxReturn"}',
        label: 'Вернулся',
      },
      color: 'secondary',
    },
  ],
])

const maximInteractionKeyboard: Keyboard = {
  one_time: false,
  buttons: [
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "dinnerLeave"}',
          label: 'Обед',
        },
        color: 'secondary',
      },
      {
        action: {
          type: 'text',
          payload: '{"button": "littleLeave"}',
          label: 'Не на долго',
        },
        color: 'secondary',
      },
    ],
    [{
      action: {
        type: 'text',
        payload: '{"button": "leaveHome"}',
        label: 'Ушел домой',
      },
      color: 'primary',
    }],
    [{
      action: {
        type: 'text',
        payload: '{"button": "sendMe"}',
        label: 'Показать себя',
      },
      color: 'primary',
    }],
    [{
      action: {
        type: 'text',
        payload: '{"button": "getDefault"}',
        label: 'На главную',
      },
      color: 'secondary',
    }],
  ],
}
const videoRecordKeyboard: Keyboard = {
  one_time: false,
  buttons: [
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "10Seconds"}',
          label: '10',
        },
        color: 'secondary',
      },
      {
        action: {
          type: 'text',
          payload: '{"button": "20seconds"}',
          label: '20',
        },
        color: 'secondary',
      },
    ],
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "30Seconds"}',
          label: '30',
        },
        color: 'secondary',
      },
      {
        action: {
          type: 'text',
          payload: '{"button": "40seconds"}',
          label: '40',
        },
        color: 'secondary',
      },
      {
        action: {
          type: 'text',
          payload: '{"button": "50Seconds"}',
          label: '50',
        },
        color: 'secondary',
      },
      {
        action: {
          type: 'text',
          payload: '{"button": "60seconds"}',
          label: '60',
        },
        color: 'secondary',
      },
    ],
    [{
      action: {
        type: 'text',
        payload: '{"button": "getDefault"}',
        label: 'На главную',
      },
      color: 'secondary',
    }],
  ],
}

const isHasAccess = (userId: number, expectedId?: number): boolean => (
  R.isNil(expectedId)
  ? true
  : expectedId === userId
)

const getKeyboard = (env?: EnvConfig, config?: {
  userId?: number;
  type?: KeyboardTypes;
}): Keyboard => {
  if (config && env) {
    const { type, userId } = config
    const { MAXIM_ID } = env

    if (type === 'videoRecord') return videoRecordKeyboard
    if (type === 'maximInteraction' && isHasAccess(userId, +MAXIM_ID)) return maximInteractionKeyboard
    if (isHasAccess(userId, +MAXIM_ID)) return maximDefaultKeyboard
  }
  return defaultKeyboard
}

export default getKeyboard
