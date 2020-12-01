const router = require('express').Router()
//SMALL API FOR KNOWN BOTTLE TYPES
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

//RETURNS THE BOTTLE TRANSACTION TO THE USER ON THE FRONTEND
router.get('/bottles', (req, res) => {
  res.send(bottleTransaction)
})
//WHERE THE BOTTLES PER TRANSACTION IS CALCULATED
router.post('/bottles', function (req, res) {
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
      console.log('This item does not match')
    }
    // console.log(`This is a test ${bottle.upc}`)
  })
  console.log(bottleTransaction)
})

module.exports = router
