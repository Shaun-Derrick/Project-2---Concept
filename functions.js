function allBottles() {
  fetch("http://localhost:5000/api/bottles/bottles")
    .then((response) => response.json())
    .then((bottles) => {
      let orderTable = `
      <ul>
          <li>$${bottles.value.toFixed(2)}</li>
        </ul>`;
      document.getElementById("orderTable").innerHTML = orderTable;
    });
}

function scanBottle() {
  const bottleUpc = document.getElementById("numberSubmit");

  const upcCode = bottleUpc.value;
  fetch("http://localhost:5000/api/bottles/bottles", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ upc: upcCode }),
  }).then(allBottles());
}

console.log(allBottles());
// added function to change processed key value to true
function processTransaction() {
  fetch("http://localhost:5000/api/bottles/bottles2", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ processed: true }),
  })
    .then((response) => response.json())
    .then((response) => {
      window.location = "refund.html";
    });
}
// setInterval to refresh total refund after bypassing submit button. Did Tony comment out the name of the function in Amir's example?
setInterval(allBottles, 3000);

function simulateScanProgress() {
  let elem = document.getElementById("myBar");
  let width = 0;
  let id = setInterval(frame, 50);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + "%";
      document.getElementById("demo").innerHTML = "Scanning " + width * 1 + "%";
      // elem.style.width = width + "%";
      // document.getElementById("demo").innerHTML = width * 1 + "%";
    }
  }
}
