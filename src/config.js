require('dotenv/config')

const { PORT, DB_URI, AUTH_KEY, EXPIRES_IN } = process.env

const config = {
  port: PORT,
  db: {
    uri: DB_URI
  },
  auth: {
    key: AUTH_KEY,
    expiresIn: EXPIRES_IN
  }
}

module.exports = config
