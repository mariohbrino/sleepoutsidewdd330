import CartItem from "./CartItem.mjs";
import ExternalServices from "./ExternalServices.mjs";
import OrderSummary from "./OrderSummary.mjs";
import {
  alertMessage,
  calculateItemSubTotal,
  calculateSummary,
  getLocalStorage,
} from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key = "so-cart") {
    this.key = key;
    this.orderDate = new Date().toISOString();
    this.taxes = 0;
    this.shipping = 0;
    this.orderTotal = 0;
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
    subtotalElement.innerHTML = `$${subtotal.toFixed(2)}`;
  }
  packageItems() {
    const cartItems = getLocalStorage(this.key);
    return cartItems.map((item) =>
      new CartItem(item.Id, item.Name, item.FinalPrice, item.Quantity).toJson(),
    );
  }
  async checkout(form) {
    const formData = new FormData(form);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const street_address = formData.get("street_address");
    const city = formData.get("city");
    const state = formData.get("state");
    const zip_code = formData.get("zip_code");
    const credit_cardnumber = formData.get("credit_cardnumber");
    const expiration_date = formData.get("expiration_date");
    const security_code = formData.get("security_code");

    const orderSummary = new OrderSummary(
      this.orderDate,
      firstname,
      lastname,
      street_address,
      city,
      state,
      zip_code,
      credit_cardnumber,
      expiration_date,
      security_code,
      this.orderTotal,
      this.shipping,
      this.taxes,
    );

    const packagedItems = this.packageItems();

    if (packagedItems.length === 0) {
      alertMessage(
        "Your cart is empty. Please add items to your cart before checking out.",
      );
      return;
    }

    orderSummary.setItems(packagedItems);

    const externalService = new ExternalServices();
    try {
      await
      externalService.checkout(orderSummary.toJson());
      localStorage.removeItem(this.key);
      window.location.href = "success.html";
    }
    catch (err) {
      const errors =
        Object.values(err.message);
      
      errors.forEach((error) => {
        alertMessage(error, false);
      });
     }
    }
    calculateSummary() {
      const cartItems = getLocalStorage("so-cart");
      const { orderTotal, taxesAmount, shippingAmount } = calculateSummary(
        cartItems,
        this.rates,
      );

      this.orderTotal = orderTotal;
      this.taxes = taxesAmount;
      this.shipping = shippingAmount;

      const taxElement = document.getElementById("tax");
      const shippingEstimateElement =
        document.getElementById("shipping-estimate");
      const orderTotalElement = document.getElementById("order-total");

      taxElement.innerHTML = `$${taxesAmount.toFixed(2)}`;
      shippingEstimateElement.innerHTML = `$${shippingAmount.toFixed(2)}`;
      orderTotalElement.innerHTML = `$${orderTotal.toFixed(2)}`;
    }
  }