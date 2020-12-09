function OnloadFunction() {
  loadReceipt();
  function loadReceipt() {
    fetch("http://localhost:5000/api/bottles/bottles2")
      .then((response) => response.json())
      .then((bottleTransaction) => loadReceiptOnPage(bottleTransaction));
  }

  //   fetch bottle transaction object from server

  let receipt;

  // Undefined global variable to store bottleTransaction object from server so it can be accessed to populate HTML

  function loadReceiptOnPage(bottleTransaction) {
    receipt = bottleTransaction;
    const receiptDate = document.getElementById("processedDate");
    receiptDate.textContent = receipt.date;

    const receiptTransNum = document.getElementById("processedTransNum");
    receiptTransNum.textContent = receipt.transactionNumber;

    const receiptTermNum = document.getElementById("processedTermNum");
    receiptTermNum.textContent = receipt.terminal;

    const receiptUser = document.getElementById("processedUserName");
    receiptUser.textContent = receipt.user;

    const receiptRefund = document.getElementById("processedRefund");
    receiptRefund.textContent = `$${receipt.value}`;
    // receipt.value;

    const receiptProcessed = document.getElementById("processedTransaction");
    receiptProcessed.textContent = receipt.processed;

    return receipt;
  }
}
// alert to reward loyalty
function reward() {
  Alert.render(
    "Your business is appreciated! We would like to show our apreciation to you by providing a coupon for $1.00 off your next coffee at our partner Good Earth Cafe.  The coupon is on the back of your receipt."
  );
}

function CustomAlert() {
  this.render = function (dialog) {
    let winW = window.innerWidth;
    let winH = window.innerHeight;
    let dialogOverlay = document.getElementById("dialogOverlay");
    let dialogBox = document.getElementById("dialogBox");
    dialogOverlay.style.display = "block";
    dialogOverlay.style.height = winH + "px";
    dialogBox.style.left = winW / 2 - 550 * 0.5 + "px";
    dialogBox.style.top = "300px";
    dialogBox.style.display = "block";
    document.getElementById("dialogBoxHead").innerHTML = "Congratulations!";
    document.getElementById("dialogBoxBody").innerHTML = dialog;
    document.getElementById("dialogBoxFoot").innerHTML =
      '<button onclick="Alert.ok()">OK</button>';
  };
  this.ok = function () {
    document.getElementById("dialogBox").style.display = "none";
    document.getElementById("dialogOverlay").style.display = "none";
  };
}
let Alert = new CustomAlert();
