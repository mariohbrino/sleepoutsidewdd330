import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function initializeCheckoutButton(
  checkoutOrderButton,
  checkoutFormElement,
  checkoutProcess,
) {
  checkoutOrderButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (!checkoutFormElement.reportValidity()) {
      return;
    }

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
}

function initializeCheckout() {
  const checkoutProcess = new CheckoutProcess();

  const checkoutFormElement = document.getElementById("checkout_form");
  const checkoutOrderButton = document.getElementById("checkout_order");

  initializeCheckoutButton(
    checkoutOrderButton,
    checkoutFormElement,
    checkoutProcess,
  );

  checkoutProcess.init();
}

loadHeaderFooter();
initializeCheckout();
