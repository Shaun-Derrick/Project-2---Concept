//
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
})

module.exports = mongoose.model('User', userSchema)
