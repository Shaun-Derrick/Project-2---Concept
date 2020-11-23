let knownBottles = [
  {
    id: 1,
    upc: '0067000104022',
    brand: 'Coca Cola',
    volume: 0.755,
    value: '0.1',
  },
  {
    id: 2,
    upc: '06741602',
    brand: 'Coca Cola',
    volume: 1,
    value: '0.25',
  },
]

let bottleTransaction = {
  id: 0,
  date: Date(),
  total: 0,
  value: 0,
  over1L: 0,
  under1L: 0,
  bottleList: [],
}
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
  res.send(bottleTransaction)
})

app.post('/bottles', function (req, res) {
  const scannedItem = req.body

  console.log(`This should be a number ${scannedItem.upc}`)

  knownBottles.forEach((bottle) => {
    if (scannedItem.upc === bottle.upc) {
      //bottleTransaction.id = bottleTransaction.length + 1

      //Bottle Count
      bottleTransaction.total = bottleTransaction.total += 1

      //Sumtotal and litre size count
      if (bottle.volume >= 1) {
        bottleTransaction.value += 0.25
        bottleTransaction.over1L += 1
      } else if (bottle.volume < 1) {
        bottleTransaction.value += 0.1
        bottleTransaction.under1L += 1
      } else {
        return 0
      }

      bottleTransaction.bottleList.push(bottle)
    } else {
      console.log('Please scan a valid code')
    }
    // console.log(`This is a test ${bottle.upc}`)
  })
  console.log(bottleTransaction)
})
