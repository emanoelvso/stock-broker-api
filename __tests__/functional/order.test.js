const User = require('../../src/models/User')
const authService = require('../../src/services/auth')

describe('order functional tests', () => {
  it('should succefully order', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: '1234',
      cpf: '45358996060',
      code: '300123',
      accountAmount: 500
    }

    const user = await new User(newUser).save()

    const token = authService.generateToken(user.id)

    const { status, body } = global.testRequest
      .post('/api/v1/orders')
      .set({ 'x-access-token': token })

    expect(status).toBe(200)
    expect(body).toMatchObject({
      message: 'Success'
    })
  })
  it('should return an error, when has no amount enough', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: '1234',
      cpf: '45358996060',
      code: '300123'
    }

    const user = await new User(newUser).save()

    const token = authService.generateToken(user.id)

    const { status, body } = global.testRequest
      .post('/api/v1/orders')
      .set({ 'x-access-token': token })

    expect(status).toBe(400)
    expect(body).toMatchObject({
      code: 400,
      message: 'Account amount insufficient to order'
    })
  })
})
