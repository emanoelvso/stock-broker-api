const User = require('../models/User')
const authService = require('../services/auth')
const userService = require('../services/user')
const ApplicationError = require('../definitions/Errors')

const createUser = async (req, res) => {
  const user = new User(req.body)
  const newUser = await user.save()

  return res.code(201).send(newUser)
}

const authenticateUser = async (req, res) => {
  const { email, password } = req.body

  const user = await userService.get({ email })

  if (!(await authService.comparePasswords(password, user.password)))
    throw new ApplicationError('Password does not match', 401)

  const token = authService.generateToken(user.id)

  return res.send({ ...user.toJSON(), ...{ token } })
}

const fetchUser = async (req, res) => {
  const userId = req?.userId

  const user = await userService.get({ _id: userId })

  if (!user) throw new ApplicationError('User not found', 404)

  return res.send({ user })
}

const getUserPosition = async (req, res) => {
  const userId = req?.userId

  const user = await userService.get({ _id: userId })

  const positions = await userService.getPosition(user)

  return res.send(positions)
}

module.exports = { createUser, authenticateUser, fetchUser, getUserPosition }
