const mongoSetup = require('@shelf/jest-mongodb/setup')

module.exports = async () => {
  await mongoSetup()
  process.env.DB_URI = process.env.MONGO_URL
}
