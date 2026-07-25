import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function initializeCheckoutButton(
  checkoutOrderButton,
  checkoutFormElement,
  checkoutProcess,
) {
  checkoutOrderButton.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!checkoutFormElement.reportValidity()) {
      return;
    }

    if (checkoutFormElement.zip_code.value) {
      checkoutProcess.calculateSummary();
      await
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
