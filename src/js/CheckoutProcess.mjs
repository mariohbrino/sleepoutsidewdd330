import {
  calculateItemSubTotal,
  calculateSummary,
  getLocalStorage,
} from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key = "so-cart") {
    this.key = key;
    this.rates = {
      taxRate: 0.06,
      shippingRate: 10,
      shippingRateAddicional: 2,
    };
  }
  init() {
    this.calculateSubtotal();
  }
  calculateSubtotal() {
    const cartItems = getLocalStorage(this.key);
    const subtotal = calculateItemSubTotal(cartItems);
    const subtotalElement = document.getElementById("subtotal-value");
    subtotalElement.innerHTML = `$ ${subtotal.toFixed(2)}`;
  }
  calculateSummary() {
    const cartItems = getLocalStorage("so-cart");
    const { orderTotal, taxesAmount, shippingAmount } = calculateSummary(
      cartItems,
      this.rates,
    );

    const taxElement = document.getElementById("tax");
    const shippingEstimateElement =
      document.getElementById("shipping-estimate");
    const orderTotalElement = document.getElementById("order-total");

    taxElement.innerHTML = `$ ${taxesAmount.toFixed(2)}`;
    shippingEstimateElement.innerHTML = `$ ${shippingAmount.toFixed(2)}`;
    orderTotalElement.innerHTML = `$ ${orderTotal.toFixed(2)}`;
  }
}
