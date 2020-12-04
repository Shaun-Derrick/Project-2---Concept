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
