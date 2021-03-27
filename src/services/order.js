const Actives = require('../models/Active')
const User = require('../models/User')
const UserActive = require('../models/UserActive')

const ApplicationError = require('../definitions/Errors')

const send = async ({ symbol, amount, userId }) => {
  const active = await Actives.findOne({ symbol })
  const user = await User.findOne({ id: userId })

  if (!active) throw new ApplicationError('Active not found', 404)
  if (!user) throw new ApplicationError('User not found', 404)

  const totalPrice = active.currentPrice * amount

  if (totalPrice > user.accountAmount)
    throw new ApplicationError('Account amount insufficient to order', 400)

  await User.updateOne(
    { id: user.id },
    { $set: { accountAmount: user.accountAmount - totalPrice } }
  )

  await new UserActive({
    user: user.id,
    symbol,
    amount,
    currentPrice: active.currentPrice
  }).save()
}

module.exports = { send }
