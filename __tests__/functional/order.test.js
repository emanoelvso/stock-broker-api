const User = require('../../src/models/User')
const Active = require('../../src/models/Active')

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

    await new Active({ symbol: 'SANB11', currentPrice: 40.77 }).save()

    const { status, body } = await global.testRequest
      .post('/api/v1/orders')
      .send({ symbol: 'SANB11', amount: 3 })
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

    await new Active({ symbol: 'SANB11', currentPrice: 40.77 }).save()

    const { status, body } = await global.testRequest
      .post('/api/v1/orders')
      .send({ symbol: 'SANB11', amount: 3 })
      .set({ 'x-access-token': token })

    expect(status).toBe(400)
    expect(body).toMatchObject({
      code: 400,
      message: 'Account amount insufficient to order'
    })
  })
})
