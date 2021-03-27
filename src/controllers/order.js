const orderService = require('../services/order')

const order = async (req, res) => {
  const { symbol, amount } = req.body

  await orderService.send({ symbol, amount })

  res.send({ message: 'Success' })
}

module.exports = { order }
