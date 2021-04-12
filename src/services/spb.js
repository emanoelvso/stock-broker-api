const User = require('../models/User')
const ApplicationError = require('../definitions/Errors')

const transfer = async ({ event, target, origin, amount }) => {
  if (event === 'TRANSFER') {
    const user = await User.findOne({ code: target.account })

    if (!user) throw new ApplicationError('User not found', 404)

    if (user.cpf !== origin.cpf)
      throw new ApplicationError('Cpf does not match', 400)

    await User.updateOne(
      { _id: user.id },
      { $set: { accountAmount: (user.accountAmount += amount) } }
    )
  }
}

module.exports = { transfer }
