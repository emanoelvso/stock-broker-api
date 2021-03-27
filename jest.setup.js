const supertest = require('supertest')
const app = require('./src/app')

const User = require('./src/models/User')

beforeEach(async () => {
  await User.deleteMany({})
})

beforeAll(async () => {
  jest.useFakeTimers()
  global.appInstance = app
  await global.appInstance.ready()
  global.testRequest = supertest(global.appInstance.server)
})

afterAll(async () => {
  jest.restoreAllMocks()
  jest.resetModules()
  jest.clearAllMocks()
  jest.restoreAllMocks()

  // await global.appInstance.close()
})
