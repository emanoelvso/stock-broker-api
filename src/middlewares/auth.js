const authService = require("../services/auth");

const authMiddleware = (req, res, next) => {
  const token = req.headers?.["x-access-token"];

  try {
    const claims = authService.decodeToken(token);

    req.userId = claims.sub;

    next();
  } catch (err) {
    res.status?.(401).send({ code: 401, error: err.message });
  }
};

module.exports = authMiddleware;
