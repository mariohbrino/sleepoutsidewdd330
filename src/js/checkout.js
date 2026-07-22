import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess();

checkoutProcess.calculateSubtotal();

const checkoutOrderButton = document.getElementById("checkoutOrder");

checkoutOrderButton.addEventListener("click", (event) => {
  event.preventDefault();

  const firstameElement = document.getElementById("firstname");
  const lastnameElement = document.getElementById("lastname");
  const cityElement = document.getElementById("city");
  const stateElement = document.getElementById("state");
  const zipCodeElement = document.getElementById("zip_code");
  const securityCodeElement = document.getElementById("security_code");

  if (zipCodeElement.value) {
    checkoutProcess.calculateSummary();
  } else {
    alert("Zip Code is required");
  }
});
