import https from 'https'
import FormData from 'form-data'
import { RequestConfig } from './types/api'
import { EnvConfig } from './types/env'

const callApi = (envConfig: EnvConfig, requestConfig: RequestConfig): Promise<string> => (
  new Promise((resolve, reject) => {
    const body: Array<Buffer> = []
    const options = {
      hostname: requestConfig.server || envConfig.API_URL,
      path: (
        requestConfig.apiMethod
        + `?access_token=${requestConfig.keyType === 'host' ? envConfig.HOST_SECRET_KEY : envConfig.SECRET_KEY}`
        + `&v=${envConfig.API_VERSION}`
        + (requestConfig.params ? `&${requestConfig.params}` : '')
      ),
      method: requestConfig.httpMethod || 'GET',
      headers: requestConfig.headers && { ...requestConfig.headers },
    }
    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        reject(`status code: ${res.statusCode}\n URL = ${options.hostname + options.path}`)
      }
      res.on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        resolve(Buffer.concat(body).toString())
      })
    })
    const { data } = requestConfig
    console.log(`send request to: ${options.hostname}${options.path}\n Time is ${new Date().toLocaleString()}\n\n`)

    if (data) {
      if (data instanceof FormData) {
        data.pipe(req)
      } else {
        req.write(data)
      }
    }

    req.on('error', (error) => {
      reject(error)
    })
    req.end()
  })
)

export default callApi
