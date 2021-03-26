const notFoundHandler = (req, reply) =>
  reply.code(404).send({
    code: 404,
    message: 'Rota não encontrada'
  })

module.exports = notFoundHandler
