const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
const Joi = require('@hapi/joi')
dotenv.config()

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err))

const port = process.env.PORT || 4000

app.use(express.json())

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

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

const User = mongoose.model('User', userSchema)

//Schema
const schema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).max(10).required(),
  password: Joi.string().min(6).max(1024).required(),
  email: Joi.string().min(3).required().email(),
})

app.post('/register', async (req, res) => {
  //Create validation don't be afraid to import @hapi/Joi put the new schema in it
  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  })

  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})
