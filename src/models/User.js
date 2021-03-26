const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const authService = require('../services/auth')

const log = require('../logger')

autoIncrement.initialize(mongoose)

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    accountAmount: {
      type: Number,
      default: 0
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email must be unique']
    },
    password: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      minLenght: 11,
      maxLenght: 11,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
      }
    }
  }
)

User.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'code',
  startAt: 1,
  incrementBy: 1
})

User.path('email').validate(
  async email => {
    const emailCount = await mongoose.models.User.countDocuments({ email })

    return !emailCount
  },
  'already exists in database.',
  'DUPLICATED'
)

User.pre('save', async function () {
  if (!this.password || !this.isModified('password')) {
    return
  }

  try {
    const hashedPassword = await authService.hashPassword(this.password)
    this.password = hashedPassword
  } catch (err) {
    console.error(err)
    log.error(`Error hashing the password for the user ${this.name}`, err)
  }
})

module.exports = mongoose.model('User', User)
