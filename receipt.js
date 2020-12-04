function OnloadFunction() {
  loadReceipt();
  function loadReceipt() {
    fetch("http://localhost:5000/api/bottles/bottles3")
      .then((response) => response.json())
      .then((bottleTransaction) => loadReceiptOnPage(bottleTransaction));
    //   .catch((error) => console.log("error", error));
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
    receiptRefund.textContent = receipt.value;

    const receiptProcessed = document.getElementById("processedTransaction");
    receiptProcessed.textContent = receipt.processed;

    return receipt;
  }
}
// alert to reward loyalty
function reward() {
  alert(
    "Your business is appreciated! We would like to show our apreciation to you by providing a coupon for $1.00 off your next coffee at our partner Good Earth Cafe.  The coupon is on the back of your receipt."
  );
}
