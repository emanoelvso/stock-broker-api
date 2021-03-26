const supertest = require('supertest')
const app = require('./src/app')

beforeAll(async () => {
  global.appInstance = app
  await global.appInstance.ready()
  global.testRequest = supertest(global.appInstance.server)
})

afterAll(async () => {
  jest.restoreAllMocks()
  jest.resetModules()
  jest.clearAllMocks()
  jest.restoreAllMocks()

  await global.appInstance.close()
})
