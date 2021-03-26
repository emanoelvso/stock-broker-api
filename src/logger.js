const pino = require('pino')

const createLogger = () => {
  return pino({
    prettyPrint: true,
    enabled: !process.NODE_ENV === 'test'
  })
}

module.exports = createLogger()
