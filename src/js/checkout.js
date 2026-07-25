import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function initializeCheckoutButton(
  checkoutOrderButton,
  checkoutFormElement,
  checkoutProcess,
) {
  checkoutOrderButton.addEventListener("click", (event) => {
    event.preventDefault();
    //Wk04:Individual Activity step:4
    const checkStatus = checkoutFormElement.checkValidity();
    checkoutFormElement.reportValidity();
    //stop form if not valid
    if (!checkStatus) {
      return;
    }

    if (checkoutFormElement.zip_code.value) {
      checkoutProcess.calculateSummary();
      checkoutProcess.checkout(checkoutFormElement);
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
