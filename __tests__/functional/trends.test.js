const User = require('../../src/models/User')
const Trends = require('../../src/models/Trends')
const authService = require('../../src/services/auth')

describe('trends functional tests', () => {
  it('should return top 5 actives', async () => {
    const trends = [
      {
        symbol: 'PETR4',
        currentPrice: 28.44
      },
      {
        symbol: 'MGLU3',
        currentPrice: 25.91
      },
      {
        symbol: 'VVAR3',
        currentPrice: 25.91
      },
      {
        symbol: 'SANB11',
        currentPrice: 40.77
      },
      {
        symbol: 'TORO4',
        currentPrice: 115.98
      }
    ]

    for (const trend of trends) {
      await new Trends(trend).save()
    }

    const newUser = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: '1234',
      cpf: '45358996060',
      code: '300123'
    }

    const user = await new User(newUser).save()

    const token = authService.generateToken(user.id)

    const { status, body } = await global.testRequest
      .get('/api/v1/trends')
      .set({ 'x-access-token': token })

    expect(status).toBe(200)
    expect(body).toMatchObject(trends)
  })
})
