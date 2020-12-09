//import Routes
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
//const request = require('request')
const authRoute = require('./Routes/auth')
const postRoute = require('./Routes/posts')
const bottleRoute = require('./Routes/bottleTransaction')
dotenv.config()

//Connect to DB

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))

//MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(express.static('.'))
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/bottles', bottleRoute)
app.use('/api/bottles2', bottleRoute)
// app.use("/api/bottles3", bottleRoute);

//PORTS
//Don't forget to run export PORT=5000 in the terminal to set the port
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on ${port}...`))
