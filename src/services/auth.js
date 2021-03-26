const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const hashPassword = async (password, salt = 10) => bcrypt.hash(password, salt)

const comparePasswords = async (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword)

const generateToken = sub =>
  jwt.sign({ sub }, config.auth.key, { expiresIn: config.auth.expiresIn })

const decodeToken = token => jwt.verify(token, config.auth.key)

module.exports = { hashPassword, comparePasswords, generateToken, decodeToken }
