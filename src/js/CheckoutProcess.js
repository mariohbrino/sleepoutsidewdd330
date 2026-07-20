import { checkout } from "./ExternalServices.mjs";
import { alertMessage, getLocalStorage } from "./utils.mjs";

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
    this.calculateOrdertotal();
  }

  async checkout(form) {
    const json = this.formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = this.packageItems(this.list);

    try {
      const res = await checkout(json);
      console.log(res);
      // Happy Path: Clear cart and redirect
      localStorage.removeItem(this.key);
      window.location.href = "../checkout/success.html";
    } catch (err) {
      // Unhappy Path: Display alert
      if (err.name === "servicesError") {
        Object.values(err.message).forEach((msg) => alertMessage(msg));
      } else {
        alertMessage("An unexpected error occurred.");
      }
    }
  }

  // Note: Ensure formDataToJSON, packageItems, and calculateOrdertotal are defined here
}
