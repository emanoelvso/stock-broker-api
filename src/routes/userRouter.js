const {
  createUser,
  authenticateUser,
  fetchUser,
  getUserPosition
} = require('../controllers/user')

const authMiddleware = require('../middlewares/auth')

const userRouter = async instance => {
  instance.route({
    url: '/users',
    method: 'POST',
    handler: createUser
  })

  instance.route({
    url: '/users/authenticate',
    method: 'POST',
    handler: authenticateUser
  })

  instance.route({
    url: '/users/me',
    method: 'GET',
    preHandler: [authMiddleware],
    handler: fetchUser
  })

  instance.route({
    url: '/users/position',
    method: 'GET',
    preHandler: [authMiddleware],
    handler: getUserPosition
  })
}

module.exports = userRouter
