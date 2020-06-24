import callApi from './callApi'
import { EnvConfig, GlobalConfig } from './types/env'
import { GetServerResponse, UpdatesResponse, NewMessageObject, UpdateObject } from './types/api'
import handleUpdate from './handleUpdate'
import { isEmpty, isNil } from 'ramda'
import { sendMessage } from './sendMessage'

interface ConnectionConfig {
  server: {
    serverName: string;
    path: string;
  };
  ts: string;
  key: string;
}

const getApiServer = async (env: EnvConfig): Promise<ConnectionConfig> => {
  try {
    const response = await callApi(env, {
      apiMethod: '/method/groups.getLongPollServer',
      params: `group_id=${env.GROUP_ID}`,
    })
    const { response: serverConfig }: GetServerResponse = JSON.parse(response)
    // server = https://lp.vk.com/hash, after split, index 2 and 3
    const serverURL = serverConfig.server.split('/').slice(2, 4)
    return {
      server: {
        serverName: serverURL[0],
        path: serverURL[1],
      },
      ts: serverConfig.ts,
      key: serverConfig.key,
    }
  } catch (e) {
    throw new Error(e)
  }
}

const bot = async (config: GlobalConfig): Promise<void> => {
  let connectionConfig: ConnectionConfig = await getApiServer(config.env)
  const updateHandler = handleUpdate(config)

  if (config.env.MODE === 'production') {
    await sendMessage(config, {
      message: 'Я включился! Можешь мне что-нибудь написать :)',
      userId: config.env.ELENA_ID,
    })
  }

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await callApi(config.env, {
        apiMethod: `/${connectionConfig.server.path}`,
        params: `act=a_check&key=${connectionConfig.key}&ts=${connectionConfig.ts}&wait=25`,
        server: connectionConfig.server.serverName,
      })
      const updateInfo: UpdatesResponse = JSON.parse(response)
      if ('failed' in updateInfo && (updateInfo.failed === 2 || updateInfo.failed === 3)) {
        if (updateInfo.failed === 2 || updateInfo.failed === 3) {
          connectionConfig = await getApiServer(config.env)
          continue
        }
      }
      connectionConfig.ts = updateInfo.ts

      console.log('Updates:', updateInfo.updates, '\n')

      if (!isEmpty(updateInfo.updates) || !isNil(updateInfo.updates)) {
        updateInfo.updates.forEach((update: UpdateObject<NewMessageObject>) => {
          updateHandler(update)
            .then(responseStatus => {
              const fromId = !isNil(update.object.message) && !isNil(update.object.message.from_id)
                ? update.object.message.from_id
                : config.env.MAXIM_ID

              if (responseStatus === 1) {
                sendMessage(config, {
                  message: 'Проблемы с камерой(\nСкажите Максиму, пусть чинит',
                  userId: fromId,
                })
              } else if (responseStatus > 0) {
                sendMessage(config, {
                  message: 'Случилась непонятная ошибка... Попробуйте позже',
                  userId: fromId,
                })
              }
            })
        })
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}

export default bot
