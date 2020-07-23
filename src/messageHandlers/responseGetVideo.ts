import { NewMessageObject, NewMessageConfig } from '../types/api'
import { EnvConfig, GlobalConfig } from '../types/env'
import callApi from '../callApi'
import FormData from 'form-data'
import https from 'https'
import { sendMessage } from '../sendMessage'
import { responseStatus } from '../types/state'
import useWebcam from '../useWebcam'

export const getResponseMessageVideo = async (
  env: EnvConfig,
  messageObject: NewMessageObject,
): Promise<NewMessageConfig> => {
  const video = await useWebcam('video', messageObject, messageObject.message.text)
  const { response: responseVideoSave } = await callApi(env, {
    apiMethod: '/method/video.save',
    params: `name=host.avi&group_id=${env.GROUP_ID}`,
    httpMethod: 'GET',
    keyType: 'host',
  }).then(JSON.parse)
  console.log(responseVideoSave)

  const videoForm = new FormData()
  videoForm.append('video_file', video, {
    filename: 'host.avi',
    contentType: 'video/x-msvideo',
  })

  const videoInfo = await new Promise(resolve => {
    const request = https.request(responseVideoSave.upload_url, {
      method: 'post',
      headers: videoForm.getHeaders(),
    })

    videoForm.pipe(request)

    request.on('response', (res) => {
      res.on('data', data => {
        resolve(data.toString())
      })
    })
  }).then(JSON.parse)
  console.log(videoInfo)

  return ({
    attachment: `video${responseVideoSave.owner_id}_${videoInfo.video_id}_${responseVideoSave.access_key}`,
  })
}

const responseVideo = (config: GlobalConfig) => async (messageObject: NewMessageObject): Promise<responseStatus> => {
  try {
    sendMessage(config, {
      message: `Начинаю запись, ждите видео примерно через ${messageObject.message.text} секунд)`,
      userId: messageObject.message.from_id,
    })
    const responseMessage = await getResponseMessageVideo(config.env, messageObject)
    sendMessage(config, {
      ...responseMessage,
      userId: messageObject.message.from_id,
      keyboardType: 'default',
    })
  } catch (e) {
    console.log(e)
    return 2
  }
  return 0
}

export default responseVideo
