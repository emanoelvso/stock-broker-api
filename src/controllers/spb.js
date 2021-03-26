const spbService = require('../services/spb')

const spbTransfer = async (req, res) => {
  const { event, target, origin, amount } = req.body

  await spbService.transfer({ event, target, origin, amount })

  res.send({ message: 'Success' })
}

module.exports = { spbTransfer }
