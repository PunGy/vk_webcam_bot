import { execFile, ExecException } from 'child_process'
import fs from 'fs'
// import { sendMessage } from './sendMessage'
// import getGlobalConfig from './utils/getGlobalConfig'
import { NewMessageObject } from './types/api'

// const config = getGlobalConfig()
/*
const bussyNotify = (userId: number): void => {
  sendMessage(config, {
    message: 'Камера сейчас занята. Вы встали в очередь, скоро получите изображение)',
    userId,
  })
}
*/
const waitFor = (milisec: number): Promise<boolean> => (
  new Promise(res => setTimeout(() => res(true), milisec))
)
const useDevice = async (execPath: string, resultPath: string, params: any[]): Promise<Buffer|null> => (
  new Promise((resolve, reject) => {
    execFile(execPath, params, async (error: ExecException | null) => {
      if (error) {
        if (error.message.includes('Device or resource busy'))
          resolve(null)
        else
          reject(1)
      } else {
        const file = fs.readFileSync(resultPath)
        resolve(file)
      }
    })
  })
)
const useWebcam = async (type: 'photo'|'video', messageObject: NewMessageObject, ...params: any[]): Promise<Buffer> => {
  const execPath = type === 'photo'
    ? './module/webcam_capture/webcam_capture'
    : './module/webcam_capture/webcam_video'
  const resultPath = type === 'photo'
    ? 'webcam_output.jpg'
    : 'out.avi'
  let isBussy = false
  let file: Buffer

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = await useDevice(execPath, resultPath, params)
    if (result == null) {
      if (!isBussy) {
        // bussyNotify(messageObject.message.from_id)
        isBussy = true
      }
      await waitFor(1000)
    } else {
      file = result
      break
    }
  }

  return file
}

export default useWebcam
