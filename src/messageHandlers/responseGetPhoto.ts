import { NewMessageObject, NewMessageConfig } from '../types/api'
import callApi from '../callApi'
import { EnvConfig, GlobalConfig } from '../types/env'
import https from 'https'
import { sendMessage } from '../sendMessage'
import { responseStatus } from '../types/state'
import FormData from 'form-data'
import useWebcam from '../useWebcam'

export const getResponseMessagePhoto = async (
  messageObject: NewMessageObject,
  env: EnvConfig,
): Promise<NewMessageConfig> => {
  const image = await useWebcam('photo', messageObject)
  const { response: uploadServer } = await callApi(env, {
    apiMethod: '/method/photos.getMessagesUploadServer',
    params: `peer_id=${messageObject.message.peer_id}`,
    httpMethod: 'GET',
  }).then(JSON.parse)

  const imageForm = new FormData()
  imageForm.append('photo', image, {
    filename: 'webcam.jpg',
    contentType: 'image/jpeg',
  })

  const photoInfo = await new Promise(resolve => {
    const request = https.request(uploadServer.upload_url, {
      method: 'post',
      headers: imageForm.getHeaders(),
    })

    imageForm.pipe(request)

    request.on('response', (res) => {
      res.on('data', data => {
        resolve(data.toString())
      })
    })
  }).then(JSON.parse)

  const { response: resultInfo } = await callApi(env, {
    apiMethod: '/method/photos.saveMessagesPhoto',
    params: `photo=${photoInfo.photo}&server=${photoInfo.server}&hash=${photoInfo.hash}`,
  }).then(JSON.parse)
  return ({
    attachment: `photo${resultInfo[0].owner_id}_${resultInfo[0].id}`,
  })
}

const responsePhoto = (config: GlobalConfig) => async (messageObject: NewMessageObject): Promise<responseStatus> => {
  try {
    const responseMessage = await getResponseMessagePhoto(messageObject, config.env)
    sendMessage(config, {
      ...responseMessage,
      userId: messageObject.message.from_id,
    })
  } catch (e) {
    return e
  }
  return 0
}

export default responsePhoto
