const mongoose = require('mongoose')

const Active = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true
    },
    currentPrice: {
      type: Number,
      required: true
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

module.exports = mongoose.model('Active', Active)
