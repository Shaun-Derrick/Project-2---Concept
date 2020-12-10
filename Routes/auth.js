const router = require('express').Router()
const User = require('../model/User') //IMPORTS THE SCHEMA
const jwt = require('jsonwebtoken') //SETUP A WEBTOKEN
const bcrypt = require('bcryptjs') //ENCRYPTS THE PASSWORD
const { registerValidation, loginValidation } = require('../validation') //DIRECTS VALIDATION TO THIS POST TO CONFIRM

let age = 3000 * 60 * 60 * 24 //3 days in miliseconds
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN)
}

//REGISTERING A NEW USER
router.post('/register', async (req, res) => {
  //VALIDATES THE DATA BEFORE ADDING USER
  console.log(`starting the post...`)
  const { error } = registerValidation(req.body)
  if (error) {
    console.log(`register validation is good ${JSON.stringify(error)}`)
    return res.status(400).send(error.details[0].message)
  }
  //CHECKING IF THE USER EXISTS
  const emailCheck = await User.findOne({ email: req.body.email })
  console.log(`Does the emailCheck: ${JSON.stringify(emailCheck)}`)
  if (emailCheck) return res.status(400).send('Email exists in DB')

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

  console.log(`User is ${JSON.stringify(user, null, 2)}`)
  try {
    const savedUser = await user.save()
    console.log(`The output of savedUser${JSON.stringify(savedUser, null, 2)}`)
    console.log(`This should be savedUser._id ${savedUser._id}`)
    const token = createToken(savedUser._id)

    console.log(`This is the JWT token: ${token}`)
    res.header('auth-token', token)
    //res.cookies('jwt', token, { httpOnly: true })
    res.status(201).json({ user: user._id }) //This status is sent to redirect to the scan page.

    //res.status(201).json(savedUser)
    //res.redirect('/bottles')
  } catch (err) {
    console.log(`What is being saved ${err.message}`)
    res.status(400).send(err)
  }
})

//LOGGING IN A NEW USER
router.post('/login', async (req, res) => {
  //VALIDATE THE DATA BEFORE LOGGING IN
  console.log(`This is the post data for /login ${req.body}`)
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //CHECKING TO SEE IF THE EMAIL EXISTS
  const savedUser = await User.findOne({ email: req.body.email })
  if (!savedUser)
    return res.status(400).send('This email or password is not valid')
  console.log(`This user exists ${savedUser}`)
  //CHECKING TO SEE IF THE PASSWORD IS VALID
  const validPass = await bcrypt.compare(req.body.password, savedUser.password)
  if (!validPass) return res.status(400).send('Invalid Password')

  //ASSIGNING A TOKEN TO CONFIRM LOGGED IN PERSON

  try {
    const token = createToken(savedUser._id)
    console.log(`This is supposed to be the id ${savedUser._id}`)
    console.log(`This is the token: ${token}`)
    res.cookie('jwt', token, { httpOnly: true, maxAge: age })
    res.header('auth-token', token)
    res.status(201).json({ user: savedUser._id })
    throw new Error('Something went wrong')
    //res.redirect('/bottles')
  } catch (err) {
    console.log(`this is the ${err.message}`)
    res.status(400).json()
  }
})

module.exports = router
