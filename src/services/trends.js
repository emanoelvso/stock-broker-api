const Trends = require('../models/Trends')

const list = async () => {
  const topTrends = await Trends.find({})

  return topTrends
}

module.exports = { list }
