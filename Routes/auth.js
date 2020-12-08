const router = require('express').Router()
const User = require('../model/User') //IMPORTS THE SCHEMA
//const jwt = require('jsonwebtoken') //SETUP A WEBTOKEN
const bcrypt = require('bcryptjs') //ENCRYPTS THE PASSWORD
const { registerValidation, loginValidation } = require('../validation') //DIRECTS VALIDATION TO THIS POST TO CONFIRM

//REGISTERING A NEW USER
router.post('/register', async (req, res) => {
  //VALIDATES THE DATA BEFORE ADDING USER
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //CHECKING IF THE USER EXISTS
  const emailCheck = await User.findOne({ email: req.body.email })
  if (emailCheck) return res.status(400).send('User exists')

  //HASH PASSWORD
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  //CREATE NEW USER
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashPassword,
  })

  try {
    const savedUser = await user.save()
    //res.status(201).json(user)
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

//LOGGING IN A NEW USER
router.post('/login', async (req, res) => {
  //VALIDATE THE DATA BEFORE LOGGING IN
  console.log(`This is going into the login endpoint ${req.body}`)
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //CHECKING TO SEE IF THE EMAIL EXISTS
  const userCheck = await User.findOne({ email: req.body.email })
  if (!userCheck)
    return res
      .status(400)
      .send(console.log('This email or password is not valid'))

  //CHECKING TO SEE IF THE PASSWORD IS VALID
  const validPass = await bcrypt.compare(req.body.password, userCheck.password)
  if (!validPass) return res.status(400).send('Invalid Password')

  //ASSIGNING A TOKEN TO CONFIRM LOGGED IN PERSON
  const token = userCheck.generateAuthToken()
  res.send(token)
  console.log(`This is the token: ${token}`)
  console.log(`This is the requested body ${req.body}`)
  // const token = jwt.sign({ _id: userCheck._id }, process.env.TOKEN)
  // res.header('auth-token', token).send(token)
  // console.log(token)
})

module.exports = router
