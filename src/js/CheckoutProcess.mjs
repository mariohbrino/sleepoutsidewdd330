import { getLocalStorage } from "./utils.mjs";

function calculateCartSubtotal(cartItems) {
  let subtotal = 0;
  cartItems.forEach((item) => {
    const itemSubtotal = item.FinalPrice * item.Quantity;
    subtotal += itemSubtotal;
  });
  return subtotal;
}

function calculateSummary(cartItems, rates) {
  let subtotal = 0;
  let taxesAmount = 0;
  let shippingAmount = 0;

  cartItems.forEach((item, index) => {
    const itemSubtotal = item.FinalPrice * item.Quantity;
    subtotal += itemSubtotal;
    if (index == 0) {
      shippingAmount += rates.shippingRate;
    } else {
      shippingAmount += rates.shippingRateAddicional;
    }
  });

  taxesAmount = subtotal * rates.taxRate;

  const orderTotal = subtotal + taxesAmount + shippingAmount;

  return {
    orderTotal,
    taxesAmount,
    shippingAmount,
  };
}

export default class CheckoutProcess {
  calculateSubtotal() {
    // calculate the subtotal of each item
    // calculate the grand subtotal

    const cartItems = getLocalStorage("so-cart");
    const subtotal = calculateCartSubtotal(cartItems);
    const subtotalElement = document.getElementById("subtotal-value");
    subtotalElement.innerHTML = `$ ${subtotal.toFixed(2)}`;
  }
  calculateSummary() {
    // calculate tax
    // calculate shipping
    // calculate order total
    const rates = {
      taxRate: 0.06,
      shippingRate: 10,
      shippingRateAddicional: 2,
    };

    const cartItems = getLocalStorage("so-cart");
    const { orderTotal, taxesAmount, shippingAmount } = calculateSummary(
      cartItems,
      rates,
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
