const { order } = require('../controllers/order')
const authMiddleware = require('../middlewares/auth')

const orderRouter = async instance => {
  instance.route({
    url: '/orders',
    method: 'POST',
    preHandler: [authMiddleware],
    handler: order
  })
}

module.exports = orderRouter
