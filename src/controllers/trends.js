const trendsService = require('../services/trends')

const trends = async (req, res) => {
  const topTrends = await trendsService.list()

  res.send(topTrends)
}

module.exports = { trends }
