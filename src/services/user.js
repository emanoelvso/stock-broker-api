const User = require('../models/User')
const UserActive = require('../models/UserActive')
const ApplicationError = require('../definitions/Errors')

const get = async params => {
  const user = await User.findOne(params)

  if (!user) throw new ApplicationError('User not found', 404)

  return user
}

const getPosition = async user => {
  const { accountAmount } = user

  const { positions, positionsAmount } = await getPositionsAmount(user.id)

  return {
    accountAmount,
    positions,
    consolidated: accountAmount + positionsAmount
  }
}

const getPositionsAmount = async userId => {
  const positions = await UserActive.find({ user: userId })

  const positionsAmount = positions
    .map(position => position.amount * position.currentPrice)
    .reduce((total, value) => (total += value))

  return { positions, positionsAmount }
}

module.exports = { getPosition, get }
