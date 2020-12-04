//
const { array, number } = require('joi')
const mongoose = require('mongoose')

//THIS IS THE SCHEMA FOR BUILDING THE DB
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
    min: 3,
  },
  lastname: {
    type: String,
    require: true,
    min: 3,
    max: 10,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  email: {
    type: String,
    require: true,
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
    type: Date,
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

module.exports = mongoose.model('User', userSchema)
