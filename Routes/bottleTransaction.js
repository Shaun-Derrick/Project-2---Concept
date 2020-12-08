const router = require("express").Router();
//SMALL API FOR KNOWN BOTTLE TYPES
let knownBottles = [
  {
    id: 1,
    upc: "067000104022",
    brand: "Coca Cola",
    volume: 0.755,
    value: "0.1",
  },
  {
    id: 2,
    upc: "06741602",
    brand: "Coca Cola",
    volume: 1,
    value: "0.25",
  },
  {
    id: 3,
    upc: "048415345101",
    brand: "Royal Reserve",
    volume: 0.75,
    value: "0.10",
  },
  {
    id: 4,
    upc: "025293600713",
    brand: "Silk",
    volume: 2,
    value: "0.25",
  },
  {
    id: 5,
    upc: "065700100269",
    brand: "Beatrice",
    volume: 4,
    value: "0.25",
  },
];
// Added to other unique bottles to known bottles

let bottleTransaction = {
  id: 0,
  terminal: 1001,
  transactionNumber: 10001,
  date: Date(),
  total: 0,
  value: 0,
  over1L: 0,
  under1L: 0,
  bottleList: [],
  processed: false,
  user: "Jenny",
};
// added keys and values to bottleTransaction

//RETURNS THE BOTTLE TRANSACTION TO THE USER ON THE FRONTEND
router.get("/bottles", (req, res) => {
  res.send(bottleTransaction);
});
//WHERE THE BOTTLES PER TRANSACTION IS CALCULATED
router.post("/bottles", function (req, res) {
  const scannedItem = req.body;

  console.log(`This should be a number ${scannedItem.upc}`);

  knownBottles.forEach((bottle) => {
    if (scannedItem.upc === bottle.upc) {
      //bottleTransaction.id = bottleTransaction.length + 1

      //Bottle Count
      bottleTransaction.total = bottleTransaction.total += 1;

      //Sumtotal and litre size count
      if (bottle.volume >= 1) {
        bottleTransaction.value += 0.25;
        bottleTransaction.over1L += 1;
      } else if (bottle.volume < 1) {
        bottleTransaction.value += 0.1;
        bottleTransaction.under1L += 1;
      } else {
        return 0;
      }

      bottleTransaction.bottleList.push(bottle);
    } else {
      console.log("This item does not match");
    }
    // console.log(`This is a test ${bottle.upc}`)
  });
  console.log(bottleTransaction);
});
// added new post response to change processed key value from false to true
router.post("/bottles2", (req, res) => {
  const changes = req.body;
  console.log(`Changes is : ${JSON.stringify(changes)}`);
  bottleTransaction = { ...bottleTransaction, ...changes };
  console.log(`Bottle transaction is : ${JSON.stringify(bottleTransaction)}`);
  // Object.assign(changes);
  res.send(bottleTransaction);
});

router.get("/bottles2", (req, res) => {
  res.send(bottleTransaction);
});

module.exports = router;
