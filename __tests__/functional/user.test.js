const authService = require('../../src/services/auth')

const User = require('../../src/models/User')
const UserActive = require('../../src/models/UserActive')

afterEach(async () => {
  await User.deleteMany({})
})

describe('User functional test', () => {
  describe('When creating a new user', () => {
    it('should successfully create a new user with encrypted password', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
        cpf: '99999999999'
      }

      const { status, body } = await global.testRequest
        .post('/api/v1/users')
        .send(newUser)

      const passwordMatch = await authService.comparePasswords(
        newUser.password,
        body.password
      )

      expect(status).toBe(201)

      expect(passwordMatch).toBeTruthy()

      expect(body).toEqual(
        expect.objectContaining({
          ...newUser,
          password: expect.any(String)
        })
      )
    })
  })

  describe('when authenticating a user', () => {
    it('should generate a token for a valid user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
        cpf: '99999999999'
      }

      const user = await new User(newUser).save()

      const response = await global.testRequest
        .post('/api/v1/users/authenticate')
        .send({ email: newUser.email, password: newUser.password })

      const JwtClaims = authService.decodeToken(response.body.token)

      expect(JwtClaims).toMatchObject({ sub: user.id })
    })

    it('Should return UNAUTHORIZED if the user with the given email is not found', async () => {
      const { status, body } = await global.testRequest
        .post('/api/v1/users/authenticate')
        .send({ email: 'some-email@mail.com', password: '1234' })

      expect(status).toBe(404)
      expect(body).toMatchObject({
        code: 404,
        message: 'User not found'
      })
    })

    it('Should return UNAUTHORIZED if the user is found but the password does not match', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
        cpf: '99999999999'
      }

      await new User(newUser).save()

      const { status, body } = await global.testRequest
        .post('/api/v1/users/authenticate')
        .send({ email: newUser.email, password: 'different password' })

      expect(status).toBe(401)
      expect(body).toMatchObject({
        code: 401,
        message: 'Password does not match'
      })
    })
  })

  describe('When getting user profile info', () => {
    it(`Should return the token's owner profile information`, async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
        cpf: '99999999999'
      }

      const user = await new User(newUser).save()

      const token = authService.generateToken(user.id)

      const { body, status } = await global.testRequest
        .get('/api/v1/users/me')
        .set({ 'x-access-token': token })

      expect(status).toBe(200)
      expect(body).toMatchObject(JSON.parse(JSON.stringify({ user })))
    })

    it(`Should return Not Found, when the user is not found`, async () => {
      const token = authService.generateToken('fake-user-id')

      const { body, status } = await global.testRequest
        .get('/api/v1/users/me')
        .set({ 'x-access-token': token })

      expect(status).toBe(404)
      expect(body.message).toBe('User not found')
    })
  })

  describe('When getting user position info', () => {
    it('should return the user position information', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
        cpf: '99999999999',
        accountAmount: 234
      }

      const user = await new User(newUser).save()

      await new UserActive({
        user: user.id,
        symbol: 'PETR4',
        amount: 2,
        currentPrice: 28.44
      }).save()

      await new UserActive({
        user: user.id,
        symbol: 'SANB11',
        amount: 3,
        currentPrice: 40.77
      }).save()

      const token = authService.generateToken(user.id)

      const { body, status } = await global.testRequest
        .get('/api/v1/users/position')
        .set({ 'x-access-token': token })

      expect(status).toBe(200)
      expect(body).toMatchObject({
        accountAmount: 234.0,
        positions: [
          {
            symbol: 'PETR4',
            amount: 2,
            currentPrice: 28.44
          },
          {
            symbol: 'SANB11',
            amount: 3,
            currentPrice: 40.77
          }
        ],
        consolidated: 413.19
      })
    })
  })
})
