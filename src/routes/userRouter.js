// const {
//   fetchAccountInfoSchema,
//   createAccount,
//   deleteAccountInfoSchema,
// } = require("../schemas/userSchema");

const {
  createUser,
  authenticateUser,
  fetchUser
} = require('../controllers/user')

const authMiddleware = require('../middlewares/auth')

const userRouter = async instance => {
  instance.route({
    url: '/users',
    method: 'POST',
    // schema: createUserSchema,
    handler: createUser
  })

  instance.route({
    url: '/users/authenticate',
    method: 'POST',
    handler: authenticateUser
  })

  instance.route({
    url: '/users/me',
    method: 'GET',
    preHandler: [authMiddleware],
    handler: fetchUser
  })

  // instance.route({
  //   url: "/user/:id",
  //   method: "DELETE",
  //   schema: deleteAccountInfoSchema,
  //   handler: deleteAccount,
  // });

  // instance.route({
  //   url: "/user/",
  //   method: "GET",
  //   schema: fetchAccountInfoSchema,
  //   handler: fetchAccountInfo,
  // });

  // instance.route({
  //   url: "/user/:id",
  //   method: "GET",
  //   schema: fetchAccountInfoSchema,
  //   handler: fetchAccountInfo,
  // });
}

module.exports = userRouter
