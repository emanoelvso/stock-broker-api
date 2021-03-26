const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const UserActive = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      autopopulate: true,
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currentPrice: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.user
        delete ret._id
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
      }
    }
  }
)

module.exports = mongoose.model('UserActive', UserActive)
