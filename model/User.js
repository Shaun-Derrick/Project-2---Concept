const jwt = require('jsonwebtoken') //SETUP A WEBTOKEN
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

//ASSIGNING A TOKEN TO CONFIRM LOGGED IN PERSON
userSchema.methods.generateAuthToken = function () {
  console.log(`This is the id of the user that is found on DBmongo ${this._id}`)
  const token = jwt.sign({ _id: this._id }, process.env.TOKEN)
  console.log(`This is the token assigned to the _id in mongoDB ${token}`)
  return token
}

module.exports = mongoose.model('User', userSchema)
