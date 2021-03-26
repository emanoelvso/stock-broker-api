const User = require('../../src/models/User')
const authService = require('../../src/services/auth')

afterEach(async () => {
  await User.deleteMany({})
})

describe('spb functional tests', () => {
  describe('When creating a transfer', () => {
    it('should successfully transfer', async () => {
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
        .post('/api/v1/spb/events')
        .send({
          event: 'TRANSFER',
          target: {
            bank: '352',
            branch: '0001',
            account: '300123'
          },
          origin: {
            bank: '033',
            branch: '03312',
            cpf: '45358996060'
          },
          amount: 1000
        })
        .set({ 'x-access-token': token })

      expect(status).toBe(200)
      expect(body).toMatchObject({
        message: 'Success'
      })
    })

    it('should return an error when cpf not match', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
        cpf: '99999999999',
        code: '300123'
      }

      const user = await new User(newUser).save()

      const token = authService.generateToken(user.id)

      const { status, body } = await global.testRequest
        .post('/api/v1/spb/events')
        .send({
          event: 'TRANSFER',
          target: {
            bank: '352',
            branch: '0001',
            account: '300123'
          },
          origin: {
            bank: '033',
            branch: '03312',
            cpf: '45358996060'
          },
          amount: 1000
        })
        .set({ 'x-access-token': token })

      expect(status).toBe(400)
      expect(body).toMatchObject({
        code: 400,
        message: 'Cpf does not match'
      })
    })
  })
})
