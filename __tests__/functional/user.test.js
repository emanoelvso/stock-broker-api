const request = require("supertest");

process.env.DB_URI = process.env.MONGO_URL;

const authService = require("../../src/services/auth");
const app = require("../../src/app");
const User = require("../../src/models/User");

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("User functional test", () => {
  describe("When creating a new user", () => {
    it("should successfully create a new user with encrypted password", async () => {
      const newUser = {
        name: "John Doe",
        email: "john@mail.com",
        password: "1234",
        cpf: "99999999999",
      };

      const { status, body } = await request(app.server)
        .post("/api/v1/users")
        .send(newUser);

      const passwordMatch = await authService.comparePasswords(
        newUser.password,
        body.password
      );

      expect(status).toBe(201);

      expect(passwordMatch).toBeTruthy();

      expect(body).toEqual(
        expect.objectContaining({
          ...newUser,
          password: expect.any(String),
        })
      );
    });
  });

  describe("when authenticating a user", () => {
    it("should generate a token for a valid user", async () => {
      const newUser = {
        name: "John Doe",
        email: "john@mail.com",
        password: "1234",
        cpf: "99999999999",
      };

      const user = await new User(newUser).save();

      const response = await request(app.server)
        .post("/api/v1/users/authenticate")
        .send({ email: newUser.email, password: newUser.password });

      const JwtClaims = authService.decodeToken(response.body.token);

      expect(JwtClaims).toMatchObject({ sub: user.id });
    });

    it("Should return UNAUTHORIZED if the user with the given email is not found", async () => {
      const { status, body } = await request(app.server)
        .post("/api/v1/users/authenticate")
        .send({ email: "some-email@mail.com", password: "1234" });

      expect(status).toBe(401);
      expect(body).toMatchObject({
        code: 401,
        message: "User not found",
      });
    });

    it("Should return UNAUTHORIZED if the user is found but the password does not match", async () => {
      const newUser = {
        name: "John Doe",
        email: "john@mail.com",
        password: "1234",
        cpf: "99999999999",
      };

      await new User(newUser).save();

      const { status, body } = await request(app.server)
        .post("/api/v1/users/authenticate")
        .send({ email: newUser.email, password: "different password" });

      expect(status).toBe(401);
      expect(body).toMatchObject({
        code: 401,
        message: "Password does not match",
      });
    });
  });

  describe("When getting user profile info", () => {
    it(`Should return the token's owner profile information`, async () => {
      const newUser = {
        name: "John Doe",
        email: "john@mail.com",
        password: "1234",
        cpf: "99999999999",
      };

      const user = await new User(newUser).save();

      const token = authService.generateToken(user.id);

      const { body, status } = await request(app.server)
        .get("/api/v1/users/me")
        .set({ "x-access-token": token });

      expect(status).toBe(200);
      expect(body).toMatchObject(JSON.parse(JSON.stringify({ user })));
    });

    it(`Should return Not Found, when the user is not found`, async () => {
      const token = authService.generateToken("fake-user-id");

      const { body, status } = await request(app.server)
        .get("/api/v1/users/me")
        .set({ "x-access-token": token });

      expect(status).toBe(404);
      expect(body.message).toBe("User not found");
    });
  });
});
