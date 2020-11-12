let bottles =[ 
  {
    "id": "1",
    "upc": "0067000104022",
    "brand": "Coca Cola",
    "volume": "755 mL"
  }, 
  {
    "id": "2",
    "upc": "06741602",
    "brand": "Coca Cola",
    "volume": "1 Liter"
  }
]

const express = require('express')
const cors = require('cors')    
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('.'))
//app.use(bodyParser.json());

let server = app.listen(5000, function(){
  var port = server.address().port
  console.log(`The server is up on ${port}`)
})

app.get('/bottles', function(req, res){
  res.send(bottles)
})



app.post('/bottles', function(req, res){
  const newRecord = req.body
  console.log(newRecord.upcCode)
  bottles.forEach(bottle => {
    if(newRecord === bottle.upc){
      
      newRecord.id = bottles.length+1
      bottles.push(req.body)

    }  else{
      console.log('Please scan a valid code')
    }
    console.log(`This is a test ${bottle.upc}`)
  })
})