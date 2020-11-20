function allBottles() {
  const bottlesScanned = document.getElementById('bottlesScanned')
  fetch('http://localhost:5000/bottles') //,{ cache: 'no-store' }
    .then((response) => response.json())
    .then(
      (bottles) => (bottlesScanned.textContent = JSON.stringify(bottles.total)),
    )
    .then((bottles) => (subtotal.textContent = JSON.stringify(bottles.value)))
}

function scanBottle() {
  const bottleUpc = document.getElementById('numberSubmit')

  const upcCode = bottleUpc.value
  console.log(upcCode)
  fetch('http://localhost:5000/bottles', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ upc: upcCode }),
  }).then(allBottles())
}

console.log(allBottles())

function makeRoomSummaryDiv(roomSummary) {
  console.log('making room summary')
  let orderSummary = document.createElement('ul')

  let roomNameDiv = document.createElement('li')
  roomNameDiv.textContent = roomSummary.name

  roomDiv.appendChild(roomNameDiv)
  roomDiv.appendChild(roomAnchor)
  return roomDiv
}

function refundList(refundArray) {
  let roomListDiv = document.getElementById('bottlesScanned')
  refundArray.forEach((bottles) => {
    let returnedBottles = createlist(bottles)
    roomListDiv.appendChild(returnedBottles)
  })
}
