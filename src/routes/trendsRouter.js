const { trends } = require('../controllers/trends')

const trendsRouter = async instance => {
  instance.route({
    url: '/trends',
    method: 'GET',
    handler: trends
  })
}

module.exports = trendsRouter
