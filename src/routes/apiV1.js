const errorHandler = require('../plugins/errorHandler')
const notFoundHandler = require('../plugins/notFoundHandler')
const userRouter = require('./userRouter')
const spbRouter = require('./spbRouter')
const trendsRouter = require('./trendsRouter')

const createMainRoutes = async instance => {
  instance.setNotFoundHandler(notFoundHandler)
  instance.setErrorHandler(errorHandler)
  instance.register(userRouter)
  instance.register(spbRouter)
  instance.register(trendsRouter)
}

module.exports = createMainRoutes
