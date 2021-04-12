const orderService = require('../services/order')

const order = async (req, res) => {
  const { symbol, amount } = req.body

  await orderService.send({ symbol, amount, userId: req.userId })

  res.send({ message: 'Success' })
}

module.exports = { order }
