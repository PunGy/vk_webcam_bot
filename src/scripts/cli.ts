import readline from 'readline'
import getGlobalConfig from '../utils/getGlobalConfig'
import { sendMessage } from '../sendMessage'

const config = getGlobalConfig()

const onExit = () => {
  console.log('see you later!')
  process.exit(0)
}

const helpResponse = `\
Type 'l' on leave, 'r' on return, 'q' on leave\n
`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'BOTI> ',
})

const littleLeave = () => (
  sendMessage(config, {
    message: 'Максимка отошел ненадолго, скоро вернётся)',
    userId: config.env.RECIVER_ID,
  })
)
const hostReturn = () => (
  sendMessage(config, {
    message: 'О, Максимка вернулся!',
    userId: config.env.RECIVER_ID,
  })
)
console.clear()
rl.prompt()

rl.on('line', async (line) => {
  try {
    switch (line.trim()) {
      case 'l':
        await littleLeave()
        console.log('sended!')
        break
      case 'r':
        await hostReturn()
        console.log('sended!')
        break
      case 'help':
        console.log(helpResponse)
        break
      case 'q':
        onExit()
        break
      case 'cls':
        console.clear()
        break
      default:
        console.log(helpResponse)
        break
    }
  } catch (e) {
    console.log(e)
  }

  rl.prompt()
}).on('close', onExit)
