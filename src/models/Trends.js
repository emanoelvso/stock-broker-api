const mongoose = require('mongoose')

const Trend = new mongoose.Schema(
  {
    symbol: {
      type: String,
      unique: true,
      required: true
    },
    currentPrice: {
      type: Number,
      requirede: true
    }
  },
  {
    toJSON: {
      transform: (_, ret) => {
        delete ret._id
        delete ret._v
      }
    }
  }
)

module.exports = mongoose.model('Trend', Trend)
