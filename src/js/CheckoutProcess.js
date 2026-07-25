import { checkout } from "./ExternalServices.mjs";
import { alertMessage, getLocalStorage } from "./utils.mjs";

// takes a form element and returns an object where the keys are the name attributes and the values are the form values
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    // 1. Calculate the subtotal of all items in the cart
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

    // 2. Calculate shipping: e.g., $10 for the first item, $2 for each additional item
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;

    // 3. Calculate tax (e.g., 6%)
    this.tax = parseFloat((this.itemTotal * 0.06).toFixed(2));

    // 4. Calculate the final order total
    this.orderTotal = parseFloat(
      (this.itemTotal + this.shipping + this.tax).toFixed(2),
    );

    // 5. Display the totals in the summary view (if applicable)
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // Optional: Select your summary elements from the DOM and update them
    const subtotalEl = document.querySelector(
      `${this.outputSelector} #subtotal`,
    );
    const shippingEl = document.querySelector(
      `${this.outputSelector} #shipping`,
    );
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const totalEl = document.querySelector(
      `${this.outputSelector} #orderTotal`,
    );

    if (subtotalEl) subtotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    }));
  }

  async checkout(form) {
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = this.packageItems(this.list);

    try {
      await checkout(json);
      localStorage.removeItem(this.key);
      window.location.href = "../checkout/success.html";
    } catch (err) {
      if (err.name === "servicesError") {
        Object.values(err.message).forEach((msg) => alertMessage(msg));
      } else {
        alertMessage("An unexpected error occurred.");
      }
    }
  }
}
