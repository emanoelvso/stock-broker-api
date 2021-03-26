const app = require('./app.js')
const config = require('./config')
const log = require('./logger')

process.on('uncaughtException', error => {
  log.error(`UncaughtException event: ${error && error.message}`, {
    stack: error.stack
  })
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  log.warn(`unhandledRejection event at: ${promise} : reason: ${reason}`)
})

const start = async () => {
  try {
    const port = config.port ? Number(config.port) : 3000

    await app.listen(port, '0.0.0.0')
  } catch (error) {
    log.error(`Error while starting the server: ${error && error.message}`, {
      stack: error.stack
    })

    process.exit(1)
  }
}

start()
