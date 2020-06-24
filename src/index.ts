import bot from './bot'
import getGlobalConfig from './utils/getGlobalConfig'

const config = getGlobalConfig()

bot(config)


/**
 *
 * (node:3448) UnhandledPromiseRejectionWarning: Error: Error: getaddrinfo ENOTFOUND lp.vk.com
    at /home/useruser/Develop/outbot/dist/bot.js:139:23
    at step (/home/useruser/Develop/outbot/dist/bot.js:33:23)
    at Object.throw (/home/useruser/Develop/outbot/dist/bot.js:14:53)
    at rejected (/home/useruser/Develop/outbot/dist/bot.js:6:65)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    s(node:3448) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
    (node:3448) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

 */
