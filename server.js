let knownBottles = [
  {
    id: '1',
    upc: '0067000104022',
    brand: 'Coca Cola',
    volume: '755 mL',
    value: '0.1',
  },
  {
    id: '2',
    upc: '06741602',
    brand: 'Coca Cola',
    volume: '1 Liter',
    value: '0.25',
  },
]
bottles = []

const express = require('express')
const cors = require('cors')
const app = express()
//const request = require('request')

app.use(express.json())
app.use(cors())
//app.use(express.static('.'))

//PORTS
//Don't forget to run export PORT=5000 in the terminal
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on ${port}...`))

app.get('/bottles', (req, res) => {
  res.send(bottles)
})

app.post('/bottles', function (req, res) {
  const scannedItem = req.body

  console.log(`This should be a number ${scannedItem.bottleUPC}`)

  knownBottles.forEach((bottle) => {
    if (scannedItem.bottleUPC === bottle.upc) {
      scannedItem.id = bottles.length + 1
      bottles.push(bottle)
    } else {
      console.log('Please scan a valid code')
    }
    // console.log(`This is a test ${bottle.upc}`)
  })
})
