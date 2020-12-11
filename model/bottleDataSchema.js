const mongoose = require('mongoose')

const bottleDataSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  id: {
    type: Number,
    default: 0,
  },
  terminal: {
    type: Number,
    require: false,
  },
  transactionNumber: {
    type: Number,
    require: false,
  },
  date: {
    type: Number,
    require: false,
  },
  total: {
    type: Number,
    require: false,
  },
  value: {
    type: Number,
    require: false,
  },
  over1L: {
    type: Number,
    require: false,
  },
  under1L: {
    type: Number,
    require: false,
  },
  bottleList: [
    {
      id: { type: Number },
      upc: { type: String },
      brand: { type: String },
      volume: { type: Number },
      value: { type: String },
    },
  ],
})

module.exports = mongoose.model('BottleData', bottleDataSchema)
