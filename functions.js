
    // function loadPage(){
    //   allBottles()
    // }
    // need to connect this to a server similar to the expressfullstack
    // 
function allBottles(){
    const showBottles = document.getElementById('bottles')
    fetch('http://localhost:5000/bottles')//, {cache: 'no-store'}
    .then((response) => response.json())
    .then((bottles) => showBottles.textContent = JSON.stringify(bottles))  
    }

    function scanBottle(){
    const bottleUpc = document.getElementById('numberSubmit')
    const upcCode = bottleUpc.value
    fetch('http://localhost:5000/bottles', {       
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {BottleUPC: upcCode} )
    }).then(
        allBottles()
    )
}

    console.log(allBottles())

