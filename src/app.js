const fastify = require("fastify");
const fp = require("fastify-plugin");
const fastifyHelmet = require("fastify-helmet");
const fastifyCors = require("fastify-cors");

const log = require("./logger");
const appConnection = require("./plugins/dataBase");
const apiv1Routes = require("./routes/apiV1");
const notFoundHandler = require("./plugins/notFoundHandler");

const app = fastify({
  logger: log,
  disableRequestLogging: true,
  ignoreTrailingSlash: true,
});

app.setNotFoundHandler(notFoundHandler);

app.register(fp(appConnection));
app.register(fastifyHelmet);
app.register(fastifyCors, {});
app.register(apiv1Routes, { prefix: "/api/v1" });

module.exports = app;
