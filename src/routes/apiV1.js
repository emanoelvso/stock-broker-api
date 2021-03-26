const errorHandler = require('../plugins/errorHandler')
const notFoundHandler = require('../plugins/notFoundHandler')
const userRouter = require('./userRouter')

const createMainRoutes = async instance => {
  instance.setNotFoundHandler(notFoundHandler)
  instance.setErrorHandler(errorHandler)
  instance.register(userRouter)
}

module.exports = createMainRoutes
