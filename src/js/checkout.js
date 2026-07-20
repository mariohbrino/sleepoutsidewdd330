import CheckoutProcess from "./CheckoutProcess.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document.querySelector("#checkout-submit").addEventListener("click", (e) => {
  e.preventDefault();

  // Get the form from the DOM
  const myForm = document.forms["checkout"];

  // Check validity and trigger browser messages
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();

  // Only proceed if the form is valid
  if (chk_status) {
    myCheckout.checkout(myForm);
  }
});
