const { spbTransfer } = require('../controllers/spb')

const spbRouter = async instance => {
  instance.route({
    url: '/spb/events',
    method: 'POST',
    handler: spbTransfer
  })
}

module.exports = spbRouter
