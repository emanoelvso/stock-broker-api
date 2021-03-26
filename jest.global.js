const mongoSetup = require('@shelf/jest-mongodb/setup')

module.exports = async () => {
  await mongoSetup()
}
