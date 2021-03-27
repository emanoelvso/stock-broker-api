const { order } = require('../controllers/order')

const orderRouter = async instance => {
  instance.route({
    url: '/orders',
    method: 'POST',
    handler: order
  })
}

module.exports = orderRouter
