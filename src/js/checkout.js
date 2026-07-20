import CheckoutProcess from "./CheckoutProcess.js";

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Listener for zip/shipping calculation if you have it
document
  #("zip")
  ?.addEventListener("blur", () => {
    myCheckout.calculateOrdertotal();
  });

// Listener for the checkout form submission
document.forms["checkout"]?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Validate form elements using HTML5 built-in validation
  const form = document.forms["checkout"];
  if (form.checkValidity()) {
    myCheckout.checkout(form);
  } else {
    form.reportValidity();
  }
});